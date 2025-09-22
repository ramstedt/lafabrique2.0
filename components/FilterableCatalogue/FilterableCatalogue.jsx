"use client";

import { useState, useMemo } from "react";
import EventFilter from "@/components/CourseFilter/CourseFilter";
import CatalogueCard from "@/components/CatalogueCard/CatalogueCard";
import { groupByMonth } from "@/utils/fetchCourses";
import styles from "./FilterableCatalogue.module.css";

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

    //category filter (empty = show all)
    if (selectedCategories && selectedCategories.length > 0) {
      list = list.filter((event) =>
        selectedCategories.includes(event.category)
      );
    }

    //month filter (empty = show all)
    if (selectedMonths && selectedMonths.length > 0) {
      const fmt = new Intl.DateTimeFormat("sv-SE", {
        month: "long",
        year: "numeric",
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
    <div>
      <h1>Kurskatalog</h1>
      <p>
        <span className="ingress">
          I vår kurskatalog hittar du hela det aktuella utbudet av La Fabriques
          kurser och workshops. Här samlar vi både återkommande favoriter och
          helt nya satsningar, allt från kvällskurser och helgworkshops till
          längre fördjupningar.
        </span>
        <br />
        Katalogen visar när kurserna planeras att hållas, vilken kategori de
        tillhör och vem som är kursledare. Nya kursstarter publiceras löpande.
        Vi rekommenderar att du håller utkik här med jämna mellanrum, då
        platserna ofta fylls snabbt.
        <br />
        Genom att klicka på respektive kurs kan du läsa mer om innehållet,
        kursupplägget, vilka material som ingår, samt pris och praktisk
        information. Där kan du också anmäla dig till kursen.
        <br />
        Våra kurser är öppna för både nybörjare och mer erfarna deltagare, och
        vi strävar efter att skapa en inkluderande och inspirerande miljö där
        alla får möjlighet att utveckla sitt skapande.
      </p>
      <div className={styles.wrapper}>
        <EventFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
          events={events}
        />
        <div>
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
        </div>
      </div>
    </div>
  );
}
