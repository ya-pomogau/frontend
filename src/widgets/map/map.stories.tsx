/* eslint-disable import/no-named-as-default */
import type { Meta, StoryObj } from '@storybook/react';
import YandexMap from '.';
import { UserRole } from 'shared/types/common.types';
import { TaskStatus } from 'entities/task/types';

const meta = {
  title: 'widgets/YandexMap',
  component: YandexMap,
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      description: 'Обработчик кнопки Откликнуться',
    },
  },
} as Meta<typeof YandexMap>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 900,
    height: 500,
    onClick: () => console.log(1),
    mapSettings: {
      latitude: 59.93,
      longitude: 30.31,
      zoom: 15,
    },
    tasks: [
      {
        id: '24',
        description: 'Помочь перенести мебель, таска взята волонтером',
        address: 'Улица Мебельная, 77',
        location: [60.699788, 40.557059],
        status: TaskStatus.CREATED,
        category: {
          id: '5',
          title: 'Название категории 5',
          points: 50,
          accessLevel: 1,
        },
        date: '2023-07-07T07:00Z',
        recipient: {
          id: '6',
          name: 'Реципиентов Иван Николаевич',
          avatar: 'https://i.ytimg.com/vi/IeelNKvu65A/hqdefault.jpg',
          phone: '+7 (916) 123-45-67',
          address: 'переулок Каховского, 3',
        },
        recipientReport: null,
        volunteer: null,
        volunteerReport: null,
        adminResolve: null,
        isPendingChanges: false,
      },
      {
        id: '28',
        description: 'Помочь перенести мебель, таска взята волонтером',
        address: 'Улица Мебельная, 77',
        location: [60.699788, 40.557059],
        status: TaskStatus.CREATED,
        category: {
          id: '5',
          title: 'Название категории 5',
          points: 50,
          accessLevel: 1,
        },
        date: '2023-07-07T07:00Z',
        recipient: {
          id: '6',
          name: 'Реципиентов Иван Николаевич',
          avatar: 'https://i.ytimg.com/vi/IeelNKvu65A/hqdefault.jpg',
          phone: '+7 (916) 123-45-67',
          address: 'переулок Каховского, 3',
        },
        recipientReport: null,
        volunteer: null,
        volunteerReport: null,
        adminResolve: null,
        isPendingChanges: false,
      },
    ],
  },
};
