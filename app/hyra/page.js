import React from 'react';
import { fetchRentals } from '@/utils/fetchRentals';
import { PortableText } from '@portabletext/react';
import RentalCard from '@/components/RentalCard/RentalCard';
import styles from './hyra.module.css';
import Form from '@/components/Form/Form';

export default async function Hyra() {
  const { data } = await fetchRentals();

  return (
    <>
      <main className={styles.wrapper}>
        <div>
          <h1>Hyr plats på La Fabrique</h1>
          <PortableText value={data.rent.description} />
        </div>
        <div className={styles.rentalsWrapper}>
          {data.rent.rentCards.map((rental, key) => {
            return <RentalCard key={key} rental={rental} />;
          })}
        </div>
        <div className={styles.form}>
          <Form rentals={data.rent.rentCards} />
        </div>
      </main>
    </>
  );
}
