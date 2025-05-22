import { client } from '@/sanity/sanity';
export const fetchEvents = async () => {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const eventQuery = `*[_type == "event" && showOnLanding == true]{
      ...
    }`;

    const events = await client.fetch(eventQuery);

    const formattedEvents = events
      .filter((event) => event.eventDateTime)
      .filter((event) => {
        const eventDate = new Date(event.eventDateTime);
        return eventDate >= now;
      })
      .map((event) => ({
        ...event,
        date: new Date(event.eventDateTime).toISOString(),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return { events: formattedEvents };
  } catch (error) {
    console.error('Error fetching events:', error);
    return { events: null };
  }
};
