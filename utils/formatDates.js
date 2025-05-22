export const formatDateWithTime = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }
  return `${date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })} kl ${date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}`;
};

export const formatDateOnly = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'long',
  });

  let formattedDate = formatter.format(date);
  let day = date.getDate();
  let suffix = 'e';

  if (day % 10 === 1 || day % 10 === 2) {
    suffix = 'a';
  }

  return `${day}${suffix} ${formattedDate.split(' ')[1]}`;
};
