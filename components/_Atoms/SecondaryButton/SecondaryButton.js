'use client';
import Link from 'next/link';
import styles from './SecondaryButton.module.css';

export default function SecondaryButton({ buttonText, url }) {
  return (
    <Link className={styles.wrapper} href={url}>
      {buttonText}
    </Link>
  );
}
