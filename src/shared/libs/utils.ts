import { FRONT_URL } from 'config/api-config';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import { Task } from 'entities/task/types';

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

export const sortTasks = (
  arr: Task[],
  item: 'date' | 'decreasing' | 'increasing'
) => {
  const sortedTasks = [...arr].sort((a, b) => {
    const aValue = item === 'date' ? a.date : a.category.scope;
    const bValue = item === 'date' ? b.date : b.category.scope;
    const order = item === 'decreasing' ? -1 : 1;

    if (aValue > bValue) {
      return order;
    }
    if (aValue < bValue) {
      return -order;
    }
    return 0;
  });
  return sortedTasks;
};
