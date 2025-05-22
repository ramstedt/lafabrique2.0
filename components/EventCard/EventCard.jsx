'use client';
import { client } from '@/sanity/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect, useRef } from 'react';
import styles from './EventCard.module.css';
import { useParams, useRouter } from 'next/navigation';
import { fetchCourseBySlug, fetchEventBySlug } from '@/utils/fetchCourses';
import Form from '@/components/Form/Form';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { formatDateWithTime } from '@/utils/formatDates';
import EventPoster from '../EventPoster/EventPoster';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

export default function EventCard() {
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
      <EventPoster event={event} />
      {event.sendTo?.length >= 2 && (
        <div ref={formRef} className={styles.form}>
          <Form event={event} />
        </div>
      )}

      <br />
    </div>
  );
}
