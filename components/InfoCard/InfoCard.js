'use client';
import Image from 'next/image';
import styles from './InfoCard.module.css';
import BorderWrapper from '../_Atoms/BorderWrapper/BorderWrapper';

export default function InfoCard({ image, alt, title, content }) {
  return (
    <div className={styles.container}>
      <div className={styles.spaceAround}>
        <BorderWrapper className={styles.imageWrapper}>
          <Image
            src={image}
            alt={alt}
            fill
            sizes='290px'
            className={styles.image}
          />
        </BorderWrapper>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
}
