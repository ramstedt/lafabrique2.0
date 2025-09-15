'use client';
import styles from './Footer.module.css';
import Link from 'next/link';
import { RiInstagramFill, RiFacebookCircleFill } from 'react-icons/ri';

export default function Footer({ data }) {
  return (
    <footer className={`${styles.wrapper}`}>
      <h2>LA FABRIQUE</h2>
      <div className={styles.contactDetails}>
        <div className={styles.contactWrapper}>
          {data.address1 && (
            <>
              <div className={styles.addressOne}>{data.address1}</div>
            </>
          )}
          {data.address2 && (
            <>
              <div className={styles.addressTwo}>{data.address2}</div>
              <div>
                <Link href='https://maps.app.goo.gl/NfbaXjcZ7y9wmVpKA'>
                  Hitta hit
                </Link>
              </div>
            </>
          )}
          <br />
          {data.email && (
            <>
              <div className={styles.email}>
                <Link href={`mailto:${data.email}`}>{data.email}</Link>
              </div>
            </>
          )}
          {data.phone && (
            <>
              <div className={styles.phone}>
                <Link href={`tel:${data.phone}`}>{data.phone}</Link>
              </div>
            </>
          )}
          <br />
          <br />
          <div>Sociala medier:</div>
          <div className={styles.socialsHeader}></div>
          {data.instagram && (
            <Link href={data.instagram} target='_blank'>
              <RiInstagramFill />
            </Link>
          )}
          {data.facebook && (
            <Link href={data.facebook} target='_blank'>
              <RiFacebookCircleFill />
            </Link>
          )}
          <br />
          <br />
          {data.openingHours && (
            <>
              <div className={styles.openingHours}>{data.openingHours}</div>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
