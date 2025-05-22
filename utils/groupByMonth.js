export const groupByMonth = (events, locale = 'sv-SE') => {
  return events.reduce((acc, event) => {
    const monthYear = event.eventDateTime.toLocaleString(locale, {
      month: 'long',
      year: 'numeric',
    });

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});
};
