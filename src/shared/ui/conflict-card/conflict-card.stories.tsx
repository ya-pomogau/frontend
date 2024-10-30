import { Meta, StoryObj } from '@storybook/react';
import { ConflictCard } from '.';
import { taskReport } from 'entities/task/types';

const meta: Meta<typeof ConflictCard> = {
  title: 'uikit/ConflictCard',
  component: ConflictCard,
  tags: ['autodocs'],
  argTypes: {
    role: {
      description: 'Выбор стороны конфликта',
      options: ['recipient', 'volunteer'],
      control: {
        type: 'radio',
      },
      type: 'string',
      defaultValue: 'valanter',
    },
    status: {
      description: 'Выбор стороны конфликта',
      options: ['fulfilled', 'rejected'],
      control: {
        type: 'radio',
      },
      type: 'string',
      defaultValue: 'fulfilled',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    user: {
      vkId: 'https://vk.com/id123456789',
      address: 'Москва, улица Плещеева, 30',
      avatar: 'https://i.pravatar.cc/300',
      name: 'Петров Петр Петрович',
      phone: '+7 (900) 800 80 80',
      _id: '63d0d8b9c14df717e58b1991',
    },
    role: 'recipient',
    status: taskReport.FULFILLED,
  },
};
