'use client';

import { useState, useMemo } from 'react';
import EventFilter from '@/components/CourseFilter/CourseFilter';
import CatalogueCard from '@/components/CatalogueCard/CatalogueCard';
import { groupByMonth } from '@/utils/groupByMonth';
import styles from './FilterableCatalogue.module.css';

export default function FilterableCatalogue({ events }) {
  const [selectedCategory, setSelectedCategory] = useState('Alla');

  const processedEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      eventDateTime: new Date(event.eventDateTime[0]),
    }));
  }, [events]);

  const categorizedEvents = useMemo(() => {
    if (selectedCategory === 'Alla') return processedEvents;
    return processedEvents.filter(
      (event) => event.category === selectedCategory
    );
  }, [selectedCategory, processedEvents]);

  const groupedByMonth = useMemo(
    () => groupByMonth(categorizedEvents),
    [categorizedEvents]
  );

  return (
    <main>
      <EventFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        events={events}
      />
      {Object.keys(groupedByMonth).length > 0 ? (
        Object.keys(groupedByMonth).map((month) => (
          <div key={month}>
            <h2>{month.charAt(0).toUpperCase() + month.slice(1)}</h2>
            <div className={styles.cardsWrapper}>
              {groupedByMonth[month].map((event) => (
                <CatalogueCard
                  key={event._id + event.eventDateTime.toISOString()}
                  event={event}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>
          Det finns inga planerade kurser eller i denna kategori för tillfället.
        </p>
      )}
    </main>
  );
}
