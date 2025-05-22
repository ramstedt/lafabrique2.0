import { client } from '@/sanity/sanity';
export const fetchWorkshopsAndEvents = async () => {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const workshopQuery = `*[_type == "course" && showOnLanding == true]{
          ...
      }`;

    const eventQuery = `*[_type == "event" && showOnLanding == true]{
          ...
      }`;

    const [workshops, events] = await Promise.all([
      client.fetch(workshopQuery),
      client.fetch(eventQuery),
    ]);

    const formattedWorkshops = workshops
      .map((workshop) => {
        if (!workshop.eventDateTime || workshop.eventDateTime.length === 0)
          return null;

        const futureDates = workshop.eventDateTime
          .map((date) => new Date(date))
          .filter((date) => date >= now);

        if (futureDates.length === 0) return null;

        return {
          ...workshop,
          date: futureDates.sort((a, b) => a - b)[0].toISOString(),
        };
      })
      .filter(Boolean);

    const formattedEvents = events
      .filter((event) => event.eventDateTime)
      .filter((event) => {
        const eventDate = new Date(event.eventDateTime);
        return eventDate >= now;
      });

    const combinedList = [...formattedWorkshops, ...formattedEvents].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    return { events: combinedList };
  } catch (error) {
    console.error('Error fetching workshops and events:', error);
    return { events: null };
  }
};
