import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import { TaskList } from '.';
import { userRole } from 'shared/types/common.types';
import { taskStatus } from 'entities/task/types';

const MockedState = {
  tasks: {
    available: [],
    active: [],
    completed: [],
  },
  isLoading: false,
  isFailed: false,
};

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
        _id: '14',
        category: {
          _id: '2',
          title: 'Название категории 2',
          points: 20,
          accessLevel: 2,
        },
        date: '2023-07-09T17:30Z',
        description: 'Короткое описание для задачи номер 14.',
        recipient: {
          name: 'Реципиентов Иван Николаевич',
          avatar: 'https://i.ytimg.com/vi/IeelNKvu65A/hqdefault.jpg',
          phone: '+7 (999) 123-45-67',
          address: 'переулок Каховского, 3',
          vkId: '123456789',
          role: userRole.RECIPIENT,
          _id: '4',
        },
        volunteer: {
          name: 'Волонтеров Петр Петрович',
          avatar:
            'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
          phone: '+7 (926) 123-45-67',
          address: 'ул. Кораблестроителей, 19к1',
          vkId: '123456789',
          role: userRole.VOLUNTEER,
          _id: '2',
        },
        address: 'переулок Каховского, 3',
        location: {
          type: 'Point',
          coordinates: [59.95252, 30.243239],
        },
        status: taskStatus.ACCEPTED,
        recipientReport: null,
        volunteerReport: null,
        adminResolve: null,
        isPendingChanges: false,
        moderator: null,
      },
      {
        _id: '19',
        category: {
          _id: '2',
          title: 'Название категории 2',
          points: 20,
          accessLevel: 2,
        },
        date: '2023-07-06T17:30Z',
        description:
          'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
        recipient: {
          name: 'Реципиентов Иван Николаевич',
          avatar: 'https://i.ytimg.com/vi/IeelNKvu65A/hqdefault.jpg',
          phone: '+7 (999) 123-45-67',
          address: 'переулок Каховского, 3',
          vkId: '123456789',
          role: userRole.RECIPIENT,
          _id: '2',
        },
        volunteer: {
          name: 'Волонтеров Петр Петрович',
          avatar:
            'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
          phone: '+7 (926) 123-45-67',
          address: 'ул. Кораблестроителей, 19к1',
          vkId: '123456789',
          role: userRole.VOLUNTEER,
          _id: '1',
        },
        address: 'переулок Каховского, 3',
        location: {
          type: 'Point',
          coordinates: [59.95252, 30.243239],
        },
        status: taskStatus.ACCEPTED,
        recipientReport: null,
        volunteerReport: null,
        adminResolve: null,
        isPendingChanges: false,
        moderator: null,
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
        _id: '15',
        category: {
          _id: '2',
          title: 'Название категории 2',
          points: 20,
          accessLevel: 2,
        },
        date: '2023-05-31T17:30Z',
        description:
          'Описание задачи 15 (срок задачи прошел, задача завершена и подтверждена)',
        recipient: {
          name: 'Реципиентов Иван Николаевич',
          avatar: 'https://i.ytimg.com/vi/IeelNKvu65A/hqdefault.jpg',
          phone: '+7 (999) 123-45-67',
          address: 'переулок Каховского, 3',
          vkId: '123456789',
          role: userRole.RECIPIENT,
          _id: '5',
        },
        volunteer: {
          name: 'Волонтеров Петр Петрович',
          avatar:
            'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
          phone: '+7 (926) 123-45-67',
          address: 'ул. Кораблестроителей, 19к1',
          vkId: '123456789',
          role: userRole.VOLUNTEER,
          _id: '4',
        },
        address: 'переулок Каховского, 3',
        location: {
          type: 'Point',
          coordinates: [59.95252, 30.243239],
        },
        status: taskStatus.ACCEPTED,
        recipientReport: null,
        volunteerReport: null,
        adminResolve: null,
        isPendingChanges: false,
        moderator: null,
      },
      {
        _id: '27',
        category: {
          _id: '2',
          title: 'Название категории 2',
          points: 20,
          accessLevel: 2,
        },
        date: '2023-07-01T08:00Z',
        address: 'переулок Каховского, 3',
        location: {
          type: 'Point',
          coordinates: [59.95252, 30.243239],
        },
        status: taskStatus.ACCEPTED,
        description:
          'Описание задачи 27 (срок задачи прошел, задача завершена и подтверждена). Тут текст длинее, чтобы проверить работу скрытия части текста.',
        recipient: {
          name: 'Реципиентов Иван Николаевич',
          avatar: 'https://i.ytimg.com/vi/IeelNKvu65A/hqdefault.jpg',
          phone: '+7 (999) 123-45-67',
          address: 'переулок Каховского, 3',
          vkId: '123456789',
          role: userRole.RECIPIENT,
          _id: '2',
        },
        volunteer: {
          name: 'Волонтеров Петр Петрович',
          avatar:
            'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
          phone: '+7 (926) 123-45-67',
          address: 'ул. Кораблестроителей, 19к1',
          vkId: '123456789',
          role: userRole.VOLUNTEER,
          _id: '1',
        },
        recipientReport: null,
        volunteerReport: null,
        adminResolve: null,
        isPendingChanges: false,
        moderator: null,
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
