export const formatDate = (date?: string): Date => {
  if (date) {
    const dateToArray = date.split('.');
    const year = +dateToArray[2];
    const month = +dateToArray[1];
    const day = +dateToArray[0];

    return new Date(year, month - 1, day);
  }

  return new Date();
};
