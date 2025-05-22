import React from 'react';
import { fetchCourses } from '@/utils/fetchCourses';
import Calendar from '@/components/Calendar/Calendar';

export default async function CalendarPage() {
  const { data } = await fetchCourses();

  const transformEvents = (eventsData) => {
    let eventsArray = [];

    eventsData.forEach((event) => {
      event.eventDateTime.forEach((dateTime) => {
        eventsArray.push({
          title: `${event.name} - ${event.instructor}`,
          start: new Date(dateTime),
          end: new Date(
            new Date(dateTime).getTime() + event.hour * 60 * 60 * 1000
          ),
          category: event.category,
        });
      });
    });

    return eventsArray;
  };

  const events = transformEvents(data);

  return (
    <main>
      <Calendar events={events} />
    </main>
  );
}
