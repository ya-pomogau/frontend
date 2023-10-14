import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

export const isTaskUrgent = (date: string): boolean =>
  differenceInMilliseconds(new Date(date), new Date()) < 86400000;

export const isEmptyObj = (obj: object): boolean => {
  for (const key in obj) {
    return false;
  }
  return true;
};
