import Image from 'next/image';
import styles from './CatalogueCard.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';
import Link from 'next/link';
import { formatDateWithTime } from '@/utils/formatDates';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

const CatalogueCard = ({ event }) => {
  const normalize = (category) =>
    category
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[ÅÄ]/g, 'A')
      .replace(/[Ö]/g, 'O')
      .replace(/[åä]/g, 'a')
      .replace(/[ö]/g, 'o')
      .replace(/[^A-Za-z ]/g, '');

  return (
    <Link
      href={`katalog/${event.slug.current}`}
      className={`${styles.card} ${normalize(event.category)}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={urlFor(event.image.asset)}
          alt={event.image.alt}
          width={400}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.icon}>
          {event.category === 'Akvarell' && (
            <Image
              src='/assets/watercolour-brushes.png'
              width={90}
              height={90}
              alt='akvarellpalette med rosor och penslar'
              className={styles.iconImage}
              priority
            />
          )}
          {event.category === 'Oljemåleri' && (
            <Image
              src='/assets/palette.png'
              width={90}
              height={90}
              alt='akvarellpalette med rosor och penslar'
              className={styles.iconImage}
              priority
            />
          )}
          {event.category == 'Keramik' && (
            <Image
              src='/assets/vup-eyes.svg'
              width={90}
              height={90}
              alt='akvarellpalette med rosor och penslar'
              className={styles.iconImage}
              priority
            />
          )}
          {event.category == 'Workshop' && (
            <Image
              src='/assets/bust.png'
              width={80}
              height={80}
              alt='akvarellpalette med rosor och penslar'
              className={styles.iconImage}
              priority
            />
          )}
        </div>
        <h3 className={styles.title}>{event.name}</h3>
        <div className={styles.dates}>
          <span>{formatDateWithTime(event.eventDateTime)}</span>
        </div>
      </div>
    </Link>
  );
};

export default CatalogueCard;
