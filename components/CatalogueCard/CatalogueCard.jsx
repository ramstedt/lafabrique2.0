import Image from "next/image";
import styles from "./CatalogueCard.module.css";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/sanity";
import Link from "next/link";
import { formatDateWithTime } from "@/utils/formatDates";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

const CatalogueCard = ({ event }) => {
  const normalize = (category) =>
    category
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[ÅÄ]/g, "A")
      .replace(/[Ö]/g, "O")
      .replace(/[åä]/g, "a")
      .replace(/[ö]/g, "o")
      .replace(/[^A-Za-z ]/g, "");

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
        <h3 className={styles.title}>{event.name}</h3>
        <div className={styles.dates}>
          <span>{formatDateWithTime(event.eventDateTime)}</span>
        </div>
      </div>
    </Link>
  );
};

export default CatalogueCard;
