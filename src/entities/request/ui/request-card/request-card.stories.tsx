import type { Meta, StoryObj } from '@storybook/react';
import RequestCard from './';

const testUser1 = {
  userAvatar:
    'https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg',
  userId: 0x100,
  userName: 'TESTOV Test Testovich',
  userPhoneNumber: '7 777 777 77 77',
  info: {
    keys: 0,
    completedTasks: 0,
    score: 0,
  },
};

const testUser2 = {
  userAvatar:
    'https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg',
  userId: 1024,
  userName: 'TESTOV Test Testovich',
  userPhoneNumber: '7 777 777 77 77',
  info: {
    keys: 1,
    completedTasks: 0,
    score: 0,
  },
};

const testUser3 = {
  userAvatar:
    'https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg',
  userId: 1024,
  userName: 'TESTOV Test Testovich',
  userPhoneNumber: '7 777 777 77 77',
  info: {
    keys: 0,
    completedTasks: 15,
    score: 1200,
  },
};

const meta: Meta<typeof RequestCard> = {
  title: 'Entities/RequestCard',
  component: RequestCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Карточка с заявкой',
      },
    },
  },
  argTypes: {
    requestCardId: {
      name: 'requestCardId',
      type: { name: 'string', required: true },
      description: 'Уникальный номер карточки',
      table: {
        type: { summary: 'number' },
      },
    },
    user: {
      name: 'user',
      description: 'Данные юзера для заявки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RequestCard>;
export const RequestCardNew: Story = {
  args: {
    requestCardId: '1',
    user: testUser1,
  },
};

export const RequestCardWithKeys: Story = {
  args: {
    requestCardId: '11',
    user: testUser2,
  },
};

export const RequestCardWithScore: Story = {
  args: {
    requestCardId: '111',
    user: testUser3,
  },
};
