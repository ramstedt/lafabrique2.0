import Image from 'next/image';
import styles from './RentalCard.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/sanity';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

const RentalCard = ({ rental }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{rental.title}</h2>
      <p>
        {rental.description} <br />
        <span className={styles.price}>{rental.price}</span>
      </p>
      <div className={styles.imageWrapper}>
        <Image src={urlFor(rental.image.asset)} alt={rental.alt} fill />
      </div>
    </div>
  );
};

export default RentalCard;
