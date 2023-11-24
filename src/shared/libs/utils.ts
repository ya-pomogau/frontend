import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

export const isTaskUrgent = (date: string): boolean =>
  differenceInMilliseconds(new Date(date), new Date()) < 86400000;

export const getFullQueriesForYApi = (
  mainJSApi: string,
  additionalApi: { [name: string]: { enable: boolean; apiKey: string } } = {}
): string => {
  let additionalQueries = '';
  for (const key in additionalApi) {
    if (additionalApi[key].enable) {
      additionalQueries = '&' + key + '=' + additionalApi[key].apiKey;
    }
  }
  return mainJSApi + additionalQueries;
};
