import React from 'react';
import { fetchMeetings } from '@/utils/fetchMeetings';
import { PortableText } from '@portabletext/react';
import RentalEventCard from '@/components/RentalEventCard/RentalEventCard';
import styles from './hyra-event.module.css';
import Form from '@/components/Form/Form';

export default async function HyraEvent() {
  const { meetings } = await fetchMeetings();

  return (
    <>
      <main className={styles.wrapper}>
        <div>
          <h1>{meetings.meetings.title}</h1>
          <PortableText value={meetings.meetings.text} />
        </div>
        <div className={styles.rentalsWrapper}>
          {meetings.meetings.meetingBlock.map((meeting, key) => {
            return (
              <RentalEventCard
                key={key}
                rental={meeting}
                right={key % 2 !== 0 ? 'right' : ''}
              />
            );
          })}
        </div>
        <div className={styles.form}>
          <Form rentals={meetings.meetings.meetingBlock} />
        </div>
      </main>
    </>
  );
}
