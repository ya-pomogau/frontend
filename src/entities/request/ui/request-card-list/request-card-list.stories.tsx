import type { Meta, StoryObj } from '@storybook/react';
import RequestCardList from './index';

const hard = [
  {
    requestCardId: 'ewew1221212',
    user: {
      userAvatar:
        'https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg',
      userId: 1,
      userName: 'TESTOV Test Testovich',
      userPhoneNumber: '7 777 777 77 77',
      info: {
        keys: 0,
        completedTasks: 12,
        score: 1000,
      },
    },
  },
  {
    requestCardId: 'ewew1221213',
    user: {
      userAvatar:
        'https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg',
      userId: 2,
      userName: 'TESTOV Test Testovich',
      userPhoneNumber: '7 777 777 77 77',
      info: {
        keys: 1,
        completedTasks: 22,
        score: 400,
      },
    },
  },
  {
    requestCardId: 'ewew1221214',
    user: {
      userAvatar:
        'https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg',
      userId: 3,
      userName: 'TESTOV Test Testovich',
      userPhoneNumber: '7 777 777 77 77',
      info: {
        keys: 0,
        completedTasks: 0,
        score: 0,
      },
    },
  },
  {
    requestCardId: 'ewew1221215',
    user: {
      userAvatar:
        'https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg',
      userId: 4,
      userName: 'TESTOV Test Testovich',
      userPhoneNumber: '7 777 777 77 77',
      info: {
        keys: 0,
        completedTasks: 12,
        score: 1000,
      },
    },
  },
];

const meta: Meta<typeof RequestCardList> = {
  title: 'Entities/RequestCardList',
  component: RequestCardList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Список карточек с заявками',
      },
    },
  },
  argTypes: {
    cards: {
      name: 'cards',
      description: 'Передается массив с карточками',
      table: {
        type: { summary: 'IRequestCard' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RequestCardList>;
export const List: Story = {
  args: {
    cards: hard,
  },
};
