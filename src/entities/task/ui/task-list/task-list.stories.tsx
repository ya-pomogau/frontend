import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import { TaskList } from '.';
import { UserRole } from 'shared/types/common.types';

const MockedState = {
  tasks: {
    available: [],
    active: [],
    completed: [],
  },
  isLoading: false,
  isFailed: false,
};

// eslint-disable-next-line react/prop-types
const Mockstore = ({ initialState, children }: Record<any, any>) => (
  <Provider
    store={configureStore({
      reducer: {
        tasks: createSlice({
          name: 'tasks',
          initialState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof TaskList> = {
  title: 'Entities/TaskList',
  component: TaskList,
  tags: ['autodocs'],
  decorators: [
    (story) => <Mockstore initialState={MockedState}>{story()}</Mockstore>,
  ],
  argTypes: {
    tasks: {
      description: 'массив отфильтрованных заявок',
    },
    extClassName: {
      description: 'Дополнительный класс для контейнера компонента',
    },
    isStatusActive: {
      description: 'пропс для рендера закрытых или активных заявок',
    },
    isMobile: {
      description: 'признак мобильной версии',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleActive: Story = {
  args: {
    tasks: [
      {
        id: 14,
        title: 'Название задачи 14',
        category: {
          id: '1',
          name: 'Название категории 1',
          scope: 10,
        },
        date: '2023-07-09T17:30Z',
        description: 'Короткое описание для задачи номер 14.',
        completed: false,
        confirmed: false,
        conflict: false,
        recipient: {
          id: '4',
          createdAt: '2023-07-09T17:30Z',
          fullname: 'Реципиентов Алексей Борисович',
          role: UserRole.RECIPIENT,
          vk: 'https://vk.com/id123456789',
          avatar: 'https://tengu.ucoz.net/novosti/morio-higaonna.jpg',
          phone: '+7 (916) 123-45-67',
          address: 'ул. Нахимова, д. 9',
          coordinates: [59.941871, 30.223494],
          status: 'confirmed',
          isActive: true,
        },
        volunteer: {
          id: '7',
          createdAt: '2023-07-09T17:30Z',
          fullname: 'Волонтеров Петр Петрович',
          role: UserRole.VOLUNTEER,
          vk: 'https://vk.com/id123456789',
          avatar:
            'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
          phone: '+7 (926) 123-45-67',
          address: 'ул. Кораблестроителей, 19к1',
          coordinates: [59.942575, 30.216757],
          status: 'verified',
          isActive: true,
          isHasKeys: true,
          scores: 2500,
        },
        address: 'ул. Нахимова, д. 9',
        coordinates: [59.941871, 30.223494],
        chat: {
          id: 4327,
          unread: 50,
        },
      },
      {
        id: 19,
        title: 'Достаточно длинное название для задачи 19',
        category: {
          id: '6',
          name: 'Название категории 6',
          scope: 60,
        },
        date: '2023-07-06T17:30Z',
        description:
          'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
        completed: true,
        confirmed: false,
        conflict: false,
        recipient: {
          id: '5',
          createdAt: '2023-07-09T17:30Z',
          fullname: 'Реципиентов Игорь Витальевич',
          role: UserRole.RECIPIENT,
          vk: 'https://vk.com/id123456789',
          avatar:
            'https://w0.peakpx.com/wallpaper/216/581/HD-wallpaper-jean-claude-van-damme-hand-face-man-actor.jpg',
          phone: '+7 (916) 123-45-67',
          address: 'ул. Наличная, 28/16В',
          coordinates: [59.941335, 30.227995],
          status: 'confirmed',
          isActive: true,
        },
        volunteer: {
          id: '7',
          createdAt: '2023-07-09T17:30Z',
          fullname: 'Волонтеров Петр Петрович',
          role: UserRole.VOLUNTEER,
          vk: 'https://vk.com/id123456789',
          avatar:
            'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
          phone: '+7 (926) 123-45-67',
          address: 'ул. Кораблестроителей, 19к1',
          coordinates: [59.942575, 30.216757],
          status: 'verified',
          isActive: true,
          isHasKeys: true,
          scores: 2500,
        },
        address: 'ул. Наличная, 28/16В',
        coordinates: [59.941871, 30.223494],
        chat: {
          id: 4478,
          unread: 238,
        },
      },
    ],
    isMobile: false,
    isStatusActive: true,
  },
};

export const ExampleNotActive: Story = {
  args: {
    tasks: [
      {
        id: 15,
        title: 'Задача 15',
        category: {
          id: '2',
          name: 'Название категории 2',
          scope: 20,
        },
        date: '2023-05-31T17:30Z',
        description:
          'Описание задачи 15 (срок задачи прошел, задача завершена и подтверждена)',
        completed: true,
        confirmed: true,
        conflict: false,
        recipient: {
          id: '4',
          createdAt: '2023-07-09T17:30Z',
          fullname: 'Реципиентов Алексей Борисович',
          role: UserRole.RECIPIENT,
          vk: 'https://vk.com/id123456789',
          avatar: 'https://tengu.ucoz.net/novosti/morio-higaonna.jpg',
          phone: '+7 (916) 123-45-67',
          address: 'ул. Нахимова, д. 9',
          coordinates: [59.941871, 30.223494],
          status: 'confirmed',
          isActive: true,
        },
        volunteer: {
          id: '7',
          createdAt: '2023-07-09T17:30Z',
          fullname: 'Волонтеров Петр Петрович',
          role: UserRole.VOLUNTEER,
          vk: 'https://vk.com/id123456789',
          avatar:
            'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
          phone: '+7 (926) 123-45-67',
          address: 'ул. Кораблестроителей, 19к1',
          coordinates: [59.942575, 30.216757],
          status: 'verified',
          isActive: true,
          isHasKeys: true,
          scores: 2500,
        },
        address: 'ул. Нахимова, д. 9',
        coordinates: [59.941871, 30.223494],
        chat: {
          id: 4545,
          unread: 1,
        },
      },
      {
        id: 27,
        title: 'Задача 27',
        category: {
          id: '2',
          name: 'Название категории 2',
          scope: 20,
        },
        date: '2023-07-01T08:00Z',
        description:
          'Описание задачи 27 (срок задачи прошел, задача завершена и подтверждена). Тут текст длинее, чтобы проверить работу скрытия части текста.',
        completed: true,
        confirmed: true,
        conflict: false,
        recipient: {
          id: '6',
          createdAt: '2023-07-09T17:30Z',
          fullname: 'Реципиентов Иван Николаевич',
          role: UserRole.RECIPIENT,
          vk: 'https://vk.com/id123456789',
          avatar: 'https://i.ytimg.com/vi/IeelNKvu65A/hqdefault.jpg',
          phone: '+7 (999) 123-45-67',
          address: 'переулок Каховского, 3',
          coordinates: [59.95252, 30.243239],
          status: 'confirmed',
          isActive: true,
        },
        volunteer: {
          id: '7',
          createdAt: '2023-07-09T17:30Z',
          fullname: 'Волонтеров Петр Петрович',
          role: UserRole.VOLUNTEER,
          vk: 'https://vk.com/id123456789',
          avatar:
            'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
          phone: '+7 (926) 123-45-67',
          address: 'ул. Кораблестроителей, 19к1',
          coordinates: [59.942575, 30.216757],
          status: 'verified',
          isActive: true,
          isHasKeys: true,
          scores: 2500,
        },
        address: 'переулок Каховского, 3',
        coordinates: [59.95252, 30.243239],
        chat: {
          id: 1278,
          unread: 0,
        },
      },
    ],
    isMobile: false,
    isStatusActive: false,
  },
};

export const ExampleEmptyActive: Story = {
  args: {
    tasks: [],
    isMobile: false,
    isStatusActive: true,
  },
};
export const ExampleEmptyNotActive: Story = {
  args: {
    tasks: [],
    isMobile: false,
    isStatusActive: false,
  },
};
