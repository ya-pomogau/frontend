import { Icon } from 'shared/ui';
import { Routes } from '../../shared/config';
import type {
  ISideBarElementProps,
  ISideBarPosition,
} from 'widgets/header/navigation/types';

export const positionConfigTop: ISideBarPosition = {
  ulflexDirection: 'row',
  ulgap: 10,
  element: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 0,
    textAlign: 'center',
  },
};

export const positionConfigMenu: ISideBarPosition = {
  ulflexDirection: 'column',
  ulgap: 30,
  // ulgap: 35,
  element: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    gap: 0,
    textAlign: 'right',
  },
};

export const linksTop: ISideBarElementProps[] = [
  {
    title: 'Личный кабинет',
    to: `${Routes.PROFILE}`,
    icon: <Icon icon="PersonIcon" color="blue" />,
  },
  {
    title: 'Блог',
    to: `${Routes.BLOG}`,
    icon: <Icon icon="WriteMessageIcon" color="blue" />,
  },
  {
    title: 'Политика конфиденциальности',
    to: `${Routes.POLICY}`,
    icon: <Icon icon="LockIcon" color="blue" />,
  },
  {
    title: 'Контакты',
    to: `${Routes.CONTACTS}`,
    icon: <Icon icon="LocationIcon" color="blue" />,
  },
];

export const linksTopAuthUser: ISideBarElementProps[] = [
  {
    title: 'Личный кабинет',
    to: `${Routes.PROFILE}`,
    icon: <Icon icon="PersonIcon" color="blue" />,
  },
  {
    title: 'Блог',
    to: `${Routes.BLOG}`,
    icon: <Icon icon="WriteMessageIcon" color="blue" />,
  },
  {
    title: 'Политика конфиденциальности',
    to: `${Routes.POLICY}`,
    icon: <Icon icon="LockIcon" color="blue" />,
  },
  {
    title: 'Контакты',
    to: `${Routes.CONTACTS}`,
    icon: <Icon icon="LocationIcon" color="blue" />,
  },
];

export const linksTopAuthAdmin: ISideBarElementProps[] = [
  {
    title: 'Личный кабинет',
    to: `${Routes.PROFILE}`,
    icon: <Icon icon="PersonIcon" color="blue" />,
  },
  {
    title: 'Блог',
    to: `${Routes.BLOG}`,
    icon: <Icon icon="WriteMessageIcon" color="blue" />,
  },
  {
    title: 'Политика конфиденциальности',
    to: `${Routes.POLICY}`,
    icon: <Icon icon="LockIcon" color="blue" />,
  },
  {
    title: 'Контакты',
    to: `${Routes.CONTACTS}`,
    icon: <Icon icon="LocationIcon" color="blue" />,
  },
  {
    title: 'Чат',
    to: `${Routes.CHAT_HUB}`,
    icon: <Icon icon="ReadMessageIcon" color="blue" />,
  },
];

export const linksMenuMobileUnauthorized: ISideBarElementProps[] = [
  {
    title: 'Личный кабинет',
    to: `${Routes.PROFILE}`,
    icon: <Icon icon="PersonIcon" color="blue" />,
  },
  {
    title: 'Блог',
    to: `${Routes.BLOG}`,
    icon: <Icon icon="WriteMessageIcon" color="blue" />,
  },
  {
    title: 'Политика конфиденциальности',
    to: `${Routes.POLICY}`,
    icon: <Icon icon="LockIcon" color="blue" />,
  },
  {
    title: 'Контакты',
    to: `${Routes.CONTACTS}`,
    icon: <Icon icon="LocationIcon" color="blue" />,
  },
];
