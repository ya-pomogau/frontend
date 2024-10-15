import { FRONT_URL, LOCAL_STORAGE_TOKEN_ACCESS } from 'config/api-config';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import { Task } from 'entities/task/types';
import { type FilterProps, IFilterValues } from 'features/filter/types';

import {
  DAYS_IN_MONTH,
  DAYS_IN_YEAR,
  DEGREES_IN_RADIAN,
  EARTH_RADIUS,
  MINUTES_IN_HOUR,
  RADIANS_IN_DEGREE,
} from './constants';
import { IDateUser } from 'pages/requests/test-users';
import { UserRole, userRole } from 'shared/types/common.types';
import { UserProfile } from 'entities/user/types';
import { MessageInterface } from '../types/chat.types';
import { mockRecipient, mockVolunteer } from '../../entities/chat/mock-users';
import { mockChatMessages } from '../../entities/chat/mock-messages';
import { CategoriesBlock } from '../../features/filter/ui/categories-block';
import { RadiusBlock } from '../../features/filter/ui/radius-block';
import { SortByBlock } from '../../features/filter/ui/sortBy-block';
import { CalenderBlock } from '../../features/filter/ui/calender-block';
import { TimeBlock } from '../../features/filter/ui/time-block';
import { UserCategoriesBlock } from '../../features/filter/ui/userCategories-block';

export const isTaskUrgent = (date: string): boolean =>
  differenceInMilliseconds(new Date(date), new Date()) < 86400000;
export const getRoleForRequest = (role: UserRole | null) => {
  let query = '';
  if (role === userRole.RECIPIENT) {
    query = userRole.RECIPIENT.toLowerCase();
  } else {
    query = userRole.VOLUNTEER.toLowerCase();
  }
  return query;
};

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

export const isEmptyObj = (obj: object) => Object.keys(obj).length > 0;

//callback link для возращения после авторизации
export const cbLink = `${FRONT_URL}/vk-auth`;

//функция редиректа на VK
export const handleRedirectVK = () => {
  window.location.href = `https://oauth.vk.com/authorize?client_id=${
    import.meta.env.VITE_APP_CLIENT_ID
  }&display=page&redirect_uri=${cbLink}&scope=email&response_type=code&v=5.120&state=4194308`;
};

export const sortTasks = (
  arr: Task[],
  item: 'date' | 'decreasing' | 'increasing'
) => {
  const sortedTasks = [...arr].sort((a, b) => {
    const aValue = item === 'date' ? a.date : a.category.points;
    const bValue = item === 'date' ? b.date : b.category.points;
    const order = item === 'decreasing' ? -1 : 1;

    if (aValue === null) {
      return 1;
    }
    if (bValue === null) {
      return -1;
    }

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

const sortDisplay = (arr: Task[], text: string): Task[] => {
  let sortedTasks: Task[] = [];
  switch (text) {
    case 'date':
      sortedTasks = sortTasks(arr, 'date');
      break;
    case 'decreasingPoints':
      sortedTasks = sortTasks(arr, 'decreasing');
      break;
    case 'increasingPoints':
      sortedTasks = sortTasks(arr, 'increasing');
      break;
    default:
      sortedTasks = arr;
      break;
  }
  return sortedTasks;
};

export const handleFilterTasks = (
  tasks: Task[],
  data: { sortBy: string; categories: string[] }
) => {
  let ret: Task[] = tasks;
  if (data?.categories.length) {
    if (data?.sortBy) {
      ret = sortDisplay(
        tasks.filter((task) => data.categories.includes(task.category.title)),
        data.sortBy
      );
    } else {
      ret = tasks.filter((task) =>
        data.categories.includes(task.category.title)
      );
    }
  }

  if (data?.sortBy) {
    if (data?.categories.length > 0) {
      ret = sortDisplay(
        tasks.filter((task) => data.categories.includes(task.category.title)),
        data.sortBy
      );
    } else {
      ret = sortDisplay(tasks, data.sortBy);
    }
  }

  return ret;
};

export const defaultFilterData: {
  values: IFilterValues;
  components: {
    categories: typeof CategoriesBlock;
    searchRadius: typeof RadiusBlock;
    sortBy: typeof SortByBlock;
    date: typeof CalenderBlock;
    time: typeof TimeBlock;
    userCategories: typeof UserCategoriesBlock;
  };
} = {
  values: {
    categories: [],
    searchRadius: '',
    sortBy: '',
    date: '',
    time: [],
    userCategories: [],
  },
  components: {
    categories: CategoriesBlock,
    searchRadius: RadiusBlock,
    sortBy: SortByBlock,
    date: CalenderBlock,
    time: TimeBlock,
    userCategories: UserCategoriesBlock,
  },
};

export const getDefaultValues = (filterParams: FilterProps['items']) => {
  if (filterParams) {
    (
      Object.keys(defaultFilterData.values) as (keyof Partial<IFilterValues>)[]
    ).map((item) => {
      if (!filterParams[item]) {
        delete defaultFilterData.values[item];
        delete defaultFilterData.components[item];
      }
    });
  }
  return defaultFilterData;
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

const filterCardsPageAdmin = (array: IDateUser[], roleUser: UserRole) => {
  return array.filter((item) => item.role === roleUser);
};

export const filterCardsUsersPageAdmin = (
  array: IDateUser[],
  search: IFilterValues,
  setDate: (date: IDateUser[]) => void
) => {
  switch (search.categories[0]) {
    case 'all':
      return setDate(array);
    case userRole.VOLUNTEER:
      return setDate(filterCardsPageAdmin(array, userRole.VOLUNTEER));
    case userRole.RECIPIENT:
      return setDate(filterCardsPageAdmin(array, userRole.RECIPIENT));
    default:
      return setDate(array);
  }
};
//FIX: добавила сюда интерфейс, тк в админах удалилась страница pages-notprocesed
export interface UserProps {
  role: UserRole;
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId: number;
  userNumber: string;
  volunteerInfo?: any;
}

export const filterUsersNamePageAdmin = (
  array: IDateUser[],
  searchName: string
) => {
  return array.filter(
    (user: UserProps) =>
      user.userName.toLowerCase().includes(searchName.toLowerCase()) &&
      user.role !== userRole.ADMIN
  );
};

export const setTokenAccess = (token: string) => {
  return localStorage.setItem(LOCAL_STORAGE_TOKEN_ACCESS, token);
};

export const getTokenAccess = () => {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_ACCESS);
};

export interface IMessageHub {
  user: UserProfile;
  messages: MessageInterface[];
  id: string;
}

export const messageHub: IMessageHub[] = [
  {
    user: mockRecipient,
    messages: mockChatMessages,
    id: '2',
  },
  {
    user: mockVolunteer,
    messages: mockChatMessages,
    id: '1',
  },
];

export const dataImages = [
  {
    id: 1,
    src: 'https://i.ibb.co/x2B4X45/0999.jpg"',
    alt: 'фото',
  },
  {
    id: 2,
    src: 'https://i.ibb.co/sjxTZ8q/4da8181ca5ebd399a5b5e2304c7408b2.jpg"',
    alt: 'фото',
  },
  {
    id: 3,
    src: 'https://i.ibb.co/x2B4X45/0999.jpg"',
    alt: 'фото',
  },
];
