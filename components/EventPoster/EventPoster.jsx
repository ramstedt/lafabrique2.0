import Image from 'next/image';
import styles from './EventPoster.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';
import { formatDateWithTime } from '@/utils/formatDates';
import { PortableText } from 'next-sanity';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

export default function EventPoster({ event }) {
  return (
    <div className={styles.poster}>
      <Image
        src='/assets/white-paper-texture-background.jpg'
        alt='Background'
        layout='fill'
        objectFit='cover'
        className={styles.backgroundImage}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={event.image ? urlFor(event.image.asset) : ''}
            alt={event.image.alt}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {event.name}
            {event.title}
          </h2>
          <span>{formatDateWithTime(event.eventDateTime)}</span>
          <p className={styles.artist}>
            Arrangör: {event.instructor}
            {event.organiser}
          </p>
          <div className={styles.description}>
            <PortableText value={event.description} />
          </div>
        </div>
      </div>
    </div>
  );
}
