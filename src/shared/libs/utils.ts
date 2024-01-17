import { FRONT_URL } from 'config/api-config';
// eslint-disable-next-line import/no-duplicates
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
// eslint-disable-next-line import/no-duplicates
import { isAfter, parseISO } from 'date-fns';

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

export const isEmptyObj = (obj: object): boolean => {
  for (const key in obj) {
    return false;
  }
  return true;
};
//callback link для возращения после авторизации
export const cbLink = `${FRONT_URL}/vk-auth`;

//функция редиректа на VK
export const handleRedirectVK = () => {
  window.location.href = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&display=page&redirect_uri=${cbLink}&scope=email&response_type=code&v=5.120&state=4194308`;
};

const degrToRadians = (deg: number): number => {
  return (Math.PI * deg) / 180;
};

const radToDegr = (rad: number): number => {
  return (rad * 180) / Math.PI;
};

//масштабирование карты под заданный радиус
export const getBounds = (coords: number[], radius: number): number[][] => {
  const earthRadius = 6371;

  const radCoords: number[] = [
    degrToRadians(coords[0]),
    degrToRadians(coords[1]),
  ];
  const deltaLat = (radius * 360) / (2 * Math.PI * earthRadius);
  const deltaLong = Math.abs(
    radToDegr(
      Math.acos(
        (Math.cos(degrToRadians(deltaLat)) -
          Math.pow(Math.sin(radCoords[0]), 2)) /
          Math.pow(Math.cos(radCoords[0]), 2)
      )
    )
  );

  return [
    [coords[0] + deltaLat, coords[1] - deltaLong],
    [coords[0] - deltaLat, coords[1] + deltaLong],
  ];
};

export const filterByDistance = (
  locationX: number[],
  locationY: number[],
  distance: number
): boolean => {
  const earthRadius = 6371;
  const locationXLatRadians = degrToRadians(locationX[0]);
  const locationYLatRadians = degrToRadians(locationY[0]);
  const getAngle = () =>
    radToDegr(
      Math.acos(
        Math.sin(locationXLatRadians) * Math.sin(locationYLatRadians) +
          Math.cos(locationXLatRadians) *
            Math.cos(locationYLatRadians) *
            Math.cos(degrToRadians(Math.abs(locationX[1] - locationY[1])))
      )
    );

  return Math.abs(2 * Math.PI * earthRadius * (getAngle() / 360)) <= distance;
};

export const filterByDate = (filterDate: string, taskDate: string): boolean => {
  const filter: number =
    parseInt(filterDate.split('-')[0]) * 365.25 +
    parseInt(filterDate.split('-')[2]) * 30 +
    parseInt(filterDate.split('-')[1]);
  const task: number =
    new Date(taskDate).getFullYear() * 365.25 +
    new Date(taskDate).getDay() * 30 +
    new Date(taskDate).getDay();
  return filter > task;
};

export const filterByTime = (
  filterTime: (string | null)[] | string,
  taskTime: string
): boolean => {
  filterTime =
    typeof filterTime === 'string' ? filterTime.split(',') : filterTime;

  const minLimit: number = filterTime[0]
    ? parseInt(filterTime[0].split(':')[0]) * 60 +
      parseInt(filterTime[0].split(':')[1])
    : -1;

  const maxLimit: number = filterTime[1]
    ? parseInt(filterTime[1].split(':')[0]) * 60 +
      parseInt(filterTime[1].split(':')[1])
    : 1500;
  const time =
    new Date(taskTime).getHours() * 60 + new Date(taskTime).getMinutes();

  return minLimit < time && time < maxLimit;
};
