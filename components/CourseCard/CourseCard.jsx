'use client';
import { client } from '@/sanity/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect, useRef } from 'react';
import styles from './CourseCard.module.css';
import { useParams, useRouter } from 'next/navigation';
import { fetchCourseBySlug, fetchEventBySlug } from '@/utils/fetchCourses';
import Form from '@/components/Form/Form';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { formatDateWithTime } from '@/utils/formatDates';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

export default function CourseCard() {
  const { slug } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);

    (async () => {
      try {
        const { data: courseData, error: courseError } =
          await fetchCourseBySlug(slug);
        if (courseError) {
          const { data: eventData, error: eventError } =
            await fetchEventBySlug(slug);
          if (eventError) {
            setError(eventError);
            if (eventError === 'Eventet hittades inte') {
              router.replace('/404');
            }
          } else {
            setEvent(eventData);
          }
        } else {
          setEvent(courseData);
        }
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [slug, router]);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) return <p className={styles.loading}>Laddar...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!event) return null;

  const dateTimes = event.eventDateTime
    ? Array.isArray(event.eventDateTime)
      ? event.eventDateTime
      : [event.eventDateTime]
    : event.date
      ? Array.isArray(event.date)
        ? event.date
        : [event.date]
      : [];

  return (
    <div className={`${styles.wrapper} margin`}>
      <div className={styles.imageWrapper}>
        <Image
          src={urlFor(event.image.asset)}
          alt={event.image.alt}
          fill
          className={styles.test}
        />
      </div>
      <div className={styles.header}>
        <h1>
          {event.name} {event.title}
        </h1>
        <h4>{event.category}</h4>
      </div>
      <div className={styles.overview}>
        {event.seats && (
          <div>
            <strong>Lediga platser:</strong> {event.freeSeats} av {event.seats}
          </div>
        )}

        <ul>
          <strong>{dateTimes.length >= 2 ? 'Tillfällen' : 'Tid'}:</strong>
          {dateTimes.map((dateTime, key) => (
            <li key={key} className={styles.time}>
              {formatDateWithTime(dateTime)}
            </li>
          ))}
          <small className={styles.sessionLength}>
            {event.category === 'Workshop' ? (
              <>
                Workshoppen varar i {event.hour}{' '}
                {event.hour > 2 ? 'timmar' : 'timme'}
              </>
            ) : (
              <>
                (Varje tillfälle är {event.hour}{' '}
                {event.hour > 2 ? 'timmar' : 'timme'})
              </>
            )}
          </small>
        </ul>
        <div>
          <strong>Hålls av:</strong> {event.instructor} {event.organiser}
        </div>

        <div>
          <strong>Pris:</strong> {event.price} kr
        </div>
        <br />
        <div>
          <button className={styles.button} onClick={scrollToForm}>
            Anmäl dig här
          </button>
        </div>
      </div>
      <div className={styles.description}>
        <PortableText value={event.description} />
      </div>
      <div ref={formRef} className={styles.form}>
        <Form event={event} />
      </div>
    </div>
  );
}
