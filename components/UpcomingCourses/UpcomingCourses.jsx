'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { fetchUpcomingCourses } from '@/utils/fetchCourses';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';
import styles from './UpcomingCourses.module.css';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

export default function UpcomingCourses() {
  const [data, setData] = useState([]);
  const scrollerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const updateArrowsFromEl = (el) => {
    if (!el) return;
    const canScroll = el.scrollWidth > el.clientWidth;

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    const atStart = ratio <= 0.1; // <= 10% from start
    const atEnd = ratio >= 0.9; // >= 90% to the end

    setShowLeftArrow(!atStart && canScroll);
    setShowRightArrow(!atEnd && canScroll);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let rafId = 0;
    let endTimer = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateArrowsFromEl(el));
      // Debounced end update for momentum scrolling
      if (endTimer) clearTimeout(endTimer);
      endTimer = setTimeout(() => updateArrowsFromEl(el), 120);
    };

    const onResize = () => updateArrowsFromEl(el);

    updateArrowsFromEl(el);

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (endTimer) clearTimeout(endTimer);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onPointerDown = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    if (e.target.setPointerCapture && e.pointerId != null) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (_) {}
    }
    el.classList.add(styles.grabbing);
    el.classList.add(styles.noSnap);
    startXRef.current = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    startScrollLeftRef.current = el.scrollLeft;
  };

  const onPointerMove = (e) => {
    const el = scrollerRef.current;
    if (!el || !isDraggingRef.current) return;
    const x = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const walk = x - startXRef.current;
    el.scrollLeft = startScrollLeftRef.current - walk;
    if (e.cancelable) e.preventDefault();
  };

  const endDrag = (e) => {
    const el = scrollerRef.current;
    isDraggingRef.current = false;
    if (el) {
      el.classList.remove(styles.grabbing);
      el.classList.remove(styles.noSnap);
    }
    if (
      e &&
      e.target &&
      e.target.releasePointerCapture &&
      e.pointerId != null
    ) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }
    const elNow = scrollerRef.current;
    if (elNow) {
      updateArrowsFromEl(elNow);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await fetchUpcomingCourses();
      setData(data ?? []);
    })();
  }, []);

  const scrollByAmount = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll(`.${styles.card}`));
    if (!cards.length) return;

    const padLeft = parseFloat(getComputedStyle(el).paddingLeft || '0');

    const epsilon = 2;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const positions = cards.map((c) => Math.max(0, c.offsetLeft - padLeft));

    const current = el.scrollLeft;

    let target;
    if (dir > 0) {
      target = positions.find((p) => p > current + epsilon);
      if (target === undefined) {
        target = maxScroll;
      }
    } else {
      const prev = positions.filter((p) => p < current - epsilon);
      target = prev.length ? prev[prev.length - 1] : 0;
    }

    target = Math.min(Math.max(0, target), maxScroll);

    if (maxScroll === 0) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
    } else if (target <= maxScroll * 1) {
      setShowLeftArrow(false);
      setShowRightArrow(true);
    } else if (target >= maxScroll * 0.9) {
      setShowRightArrow(false);
      setShowLeftArrow(true);
    } else {
      setShowLeftArrow(true);
      setShowRightArrow(true);
    }

    el.scrollTo({ left: target, behavior: 'smooth' });
    Promise.resolve().then(() => updateArrowsFromEl(el));
    setTimeout(() => updateArrowsFromEl(el), 220);
  };

  if (!data || data.length === 0) {
    return <div></div>;
  }

  return (
    <>
      <section className={styles.wrapper} aria-label='Kommande kurser'>
        <h2 className={styles.heading}>Kommande kurser</h2>

        <button
          type='button'
          aria-label='Scrolla vänster'
          className={`${styles.arrow} ${styles.left} ${showLeftArrow ? styles.visible : styles.hidden}`}
          onClick={() => scrollByAmount(-1)}
        >
          <GoChevronLeft />
        </button>

        <button
          type='button'
          aria-label='Scrolla höger'
          className={`${styles.arrow} ${styles.right} ${showRightArrow ? styles.visible : styles.hidden}`}
          onClick={() => scrollByAmount(1)}
        >
          <GoChevronRight />
        </button>

        {showLeftArrow && <div aria-hidden className={styles.fadeLeft} />}
        {showRightArrow && <div aria-hidden className={styles.fadeRight} />}

        <div
          ref={scrollerRef}
          className={styles.scroller}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={endDrag}
        >
          {data.map((course, key) => (
            <article
              className={styles.card}
              key={(course._id || course.name) + key}
            >
              <div className={styles.courseImgWrapper}>
                <Image
                  src={urlFor(course.image?.asset)}
                  alt={course.image?.alt || course.name || 'Kursbild'}
                  width={300}
                  height={400}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <div className={styles.cardBody}>
                {course.slug?.current && (
                  <Link
                    className={styles.link}
                    href={`/kurser/${course.slug.current}`}
                  >
                    <h3 className={styles.title}>
                      {course.name || course.title}
                    </h3>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
        <div>
          <div className={styles.buttonWrapper}>
            <Link className={styles.button} href='/kurskatalog'>
              Besök hela kurskatalogen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
