'use client';

import { useState, useMemo } from 'react';
import EventFilter from '@/components/CourseFilter/CourseFilter';
import CatalogueCard from '@/components/CatalogueCard/CatalogueCard';
import { groupByMonth } from '@/utils/fetchCourses';
import styles from './FilterableCatalogue.module.css';

export default function FilterableCatalogue({ events }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);

  const processedEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      eventDateTime: new Date(event.eventDateTime[0]),
    }));
  }, [events]);

  const categorizedEvents = useMemo(() => {
    let list = processedEvents;

    // Category filter (empty = show all)
    if (selectedCategories && selectedCategories.length > 0) {
      list = list.filter((event) =>
        selectedCategories.includes(event.category)
      );
    }

    // Month filter (empty = show all)
    if (selectedMonths && selectedMonths.length > 0) {
      const fmt = new Intl.DateTimeFormat('sv-SE', {
        month: 'long',
        year: 'numeric',
      });
      list = list.filter((event) => {
        const label = fmt.format(event.eventDateTime).toLowerCase();
        return selectedMonths.includes(label);
      });
    }

    return list;
  }, [processedEvents, selectedCategories, selectedMonths]);

  const groupedByMonth = useMemo(
    () => groupByMonth(categorizedEvents),
    [categorizedEvents]
  );

  return (
    <main>
      <EventFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedMonths={selectedMonths}
        setSelectedMonths={setSelectedMonths}
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
        <p>Det finns inga planerade kurser just nu.</p>
      )}
    </main>
  );
}
