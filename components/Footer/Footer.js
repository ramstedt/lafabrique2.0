'use client';
import { useState } from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';
import { RiInstagramFill, RiFacebookCircleFill } from 'react-icons/ri';
import PrivacyModal from '../PrivacyModal/PrivacyModal';

export default function Footer({ data }) {
  return (
    <footer className={`${styles.wrapper}`} id='kontakt'>
      <h2>LA FABRIQUE</h2>
      <div className={styles.contactDetails}>
        <div className={styles.contactWrapper}>
          {data.address1 && (
            <>
              <div className={styles.addressOne}>
                <big>{data.address1}</big>
              </div>
            </>
          )}
          {data.address2 && (
            <>
              <div className={styles.addressTwo}>
                <big>{data.address2}</big>
              </div>
              <br />
              {data.openingHours && (
                <>
                  <div className={styles.openingHours}>{data.openingHours}</div>
                </>
              )}
              <br /> <h3>Vägbeskrivning:</h3>
              <div>6 minuter promenad från Vagnhallen Majorna</div>
              <div>
                <Link
                  href='https://maps.app.goo.gl/NfbaXjcZ7y9wmVpKA'
                  target='_blank'
                >
                  Hitta hit
                </Link>
              </div>
            </>
          )}
          <br />
          <h3>Kontakt:</h3>
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
          <h3>Sociala medier:</h3>
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
        </div>
      </div>
      <PrivacyModal
        buttonColor='#d09c96'
        buttonHoverColor='#f5f5ef'
        capitalize
      />
    </footer>
  );
}
