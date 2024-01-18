import { FRONT_URL } from 'config/api-config';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import {
  DAYS_IN_MONTH,
  DAYS_IN_YEAR,
  DEGREES_IN_RADIAN,
  EARTH_RADIUS,
  MINUTES_IN_HOUR,
  RADIANS_IN_DEGREE,
} from './constants';

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

const degrToRadians = (degrees: number): number => {
  return degrees * RADIANS_IN_DEGREE;
};

const radToDegr = (radians: number): number => {
  return radians * DEGREES_IN_RADIAN;
};

//масштабирование карты под заданный радиус
export const getBounds = (coords: number[], radius: number): number[][] => {
  const latitude = coords[0];
  const radiansLatitude: number = degrToRadians(latitude);
  const deltaLat = (radius * 360) / (2 * Math.PI * EARTH_RADIUS);
  const deltaLong = Math.abs(
    radToDegr(
      Math.acos(
        (Math.cos(degrToRadians(deltaLat)) -
          Math.pow(Math.sin(radiansLatitude), 2)) /
          Math.pow(Math.cos(radiansLatitude), 2)
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
  const locationXLatRadians = degrToRadians(locationX[0]);
  const locationYLatRadians = degrToRadians(locationY[0]);
  const angle = radToDegr(
    Math.acos(
      Math.sin(locationXLatRadians) * Math.sin(locationYLatRadians) +
        Math.cos(locationXLatRadians) *
          Math.cos(locationYLatRadians) *
          Math.cos(degrToRadians(Math.abs(locationX[1] - locationY[1])))
    )
  );

  return Math.abs(2 * Math.PI * EARTH_RADIUS * (angle / 360)) <= distance;
};

export const filterByDate = (
  filterDate: string,
  taskDateString: string
): boolean => {
  const taskDate = new Date(taskDateString);
  const [year, day, month] = filterDate.split('-');
  const filter: number =
    parseInt(year) * DAYS_IN_YEAR +
    parseInt(month) * DAYS_IN_MONTH +
    parseInt(day);
  const task: number =
    taskDate.getFullYear() * DAYS_IN_YEAR +
    taskDate.getDay() * DAYS_IN_MONTH +
    taskDate.getDay();
  return filter > task;
};

export const filterByTime = (
  filterTime: (string | null)[] | string,
  taskTimeString: string
): boolean => {
  filterTime =
    typeof filterTime === 'string' ? filterTime.split(',') : filterTime;
  const taskTime = new Date(taskTimeString);
  const [hourMin, minuteMin] = filterTime[0]
    ? filterTime[0].split(':')
    : ['0', '0'];
  const [hourMax, minuteMax] = filterTime[1]
    ? filterTime[1].split(':')
    : ['24', '0'];
  const minLimit: number =
    parseInt(hourMin) * MINUTES_IN_HOUR + parseInt(minuteMin);
  const maxLimit: number =
    parseInt(hourMax) * MINUTES_IN_HOUR + parseInt(minuteMax);
  const time = taskTime.getHours() * MINUTES_IN_HOUR + taskTime.getMinutes();

  return minLimit < time && time < maxLimit;
};
