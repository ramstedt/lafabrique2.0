import Image from 'next/image';
import styles from './RentalEventCard.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

const RentalEventCard = ({ rental, right }) => {
  return (
    <div className={`${styles.wrapper} ${right ? styles.right : ''}`}>
      <div className={styles.imageWrapper}>
        <Image src={urlFor(rental.image.asset)} alt={rental.alt} fill />
      </div>
      <div className={styles.text}>
        <h2>{rental.title}</h2>
        <p>
          {rental.description} <br />
          <span className={styles.price}>{rental.price}</span>
        </p>
      </div>
    </div>
  );
};

export default RentalEventCard;
