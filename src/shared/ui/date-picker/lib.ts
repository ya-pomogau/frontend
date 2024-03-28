export const getMonth = (date: Date): string => {
  let month = date.toLocaleDateString('ru-RU', {
    month: 'long',
  });

  month = month[0].toUpperCase() + month.slice(1);

  return month;
};
