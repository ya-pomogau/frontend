import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

export const isTaskUrgent = (date: string): boolean =>
  differenceInMilliseconds(new Date(date), new Date()) < 86400000;
