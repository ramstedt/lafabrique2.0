import React from "react";
import { fetchCourses } from "@/utils/fetchCourses";
import FilterableCatalogue from "@/components/FilterableCatalogue/FilterableCatalogue";
import Hero from "@/components/Hero/Hero";

export default async function Catalogue() {
  const { data: events } = await fetchCourses();

  if (!events || events.length === 0) {
    return (
      <main>
        <p>Det finns inga planerade kurser för tillfället.</p>
      </main>
    );
  }

  return (
    <main>
      <Hero src="/images/about.png" alt="alt text" type="image" />
      <FilterableCatalogue events={events} />
    </main>
  );
}
