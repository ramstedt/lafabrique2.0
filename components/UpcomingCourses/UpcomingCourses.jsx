'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';
import styles from './UpcomingCourses.module.css';
import dynamic from 'next/dynamic';
const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false });
import 'react-multi-carousel/lib/styles.css';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

export default function UpcomingCourses({ events = [] }) {
  const data = useMemo(() => {
    const sorted = Array.isArray(events)
      ? [...events].sort((a, b) => (a.firstDate || 0) - (b.firstDate || 0))
      : [];
    return sorted.slice(0, 5);
  }, [events]);

  if (!data || data.length === 0) return <div />;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  console.log('events prop', events);
  console.log('data', data);
  return (
    <>
      <section className={styles.wrapper} aria-label='Kommande kurser'>
        <h1>Kommande kurser</h1>
        <p>
          Här finns ett axplock av våra kommande kurser. Du hittar alla vara
          kurser i <Link href='/katalog'>Kurskatalogen</Link>
        </p>
        <Carousel
          responsive={responsive}
          swipeable
          draggable
          showDots={true}
          infinite={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition='transform 0.5s ease-in-out'
          transitionDuration={500}
          containerClass='carousel-container'
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item-padding-40-px'
        >
          {data.map((course, key) => (
            <div
              className={styles.card}
              key={(course._id || course.name) + key}
            >
              <div className={styles.courseImgWrapper}>
                <Image
                  src={
                    course.image?.asset
                      ? urlFor(course.image.asset)
                      : '/placeholder.png'
                  }
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
                    href={`/katalog/${course.slug.current}`}
                  >
                    <h3 className={styles.title}>
                      {course.name || course.title}
                    </h3>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      <div className={styles.buttonWrapper}>
        <Link className={styles.button} href='/katalog'>
          Besök hela kurskatalogen
        </Link>
      </div>
    </>
  );
}
