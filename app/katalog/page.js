import React from 'react';
import { fetchCourses } from '@/utils/fetchCourses';
import FilterableCatalogue from '@/components/FilterableCatalogue/FilterableCatalogue';

export default async function Catalogue() {
  const { data: events } = await fetchCourses();

  if (!events || events.length === 0) {
    return (
      <main>
        <p>Det finns inga planerade kurser för tillfället.</p>
      </main>
    );
  }

  return <FilterableCatalogue events={events} />;
}
