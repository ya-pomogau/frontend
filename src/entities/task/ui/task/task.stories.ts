import { Meta, StoryObj } from '@storybook/react';
import { TaskItem } from '.';

const meta = {
  title: 'Entities/TaskItem',
  component: TaskItem,
  tags: ['autodocs'],
} as Meta<typeof TaskItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    isMobile: false,
    category: {
      id: 'id',
      name: 'сопровождение',
      scope: 2,
    },
    date: '2023-05-27T14:10Z',
    address: 'ул. Потолочного д. 9',
    description:
      'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
    count: 30,
    avatar: 'https://i.pravatar.cc/300',
    recipientName: 'Петров Петр Петрович',
    recipientPhoneNumber: '+7(000) 000-00-00',
    unreadMessages: 60,
  },
};

export const Mobile: Story = {
  args: {
    isMobile: true,
    category: {
      id: 'id',
      name: 'сопровождение',
      scope: 2,
    },
    date: '2023-05-27T14:10Z',
    address: 'ул. Потолочного д. 9',
    description:
      'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
    count: 30,
    avatar: 'https://i.pravatar.cc/300',
    recipientName: 'Иванов Иван Иванович',
    recipientPhoneNumber: '+7(000) 000-00-00',
  },
};

export const ExampleWithNoRecipient: Story = {
  args: {
    isMobile: false,
    category: {
      id: 'id',
      name: 'сопровождение',
      scope: 2,
    },
    date: '2023-05-27T14:10Z',
    address: 'ул. Потолочного д. 9',
    description:
      'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
    count: 30,
  },
};

export const ExampleConfirmed: Story = {
  args: {
    isMobile: false,
    confirmed: true,
    category: {
      id: 'id',
      name: 'сопровождение',
      scope: 2,
    },
    date: '2015-05-27T14:10Z',
    avatar: 'https://i.pravatar.cc/300',
    recipientName: 'Иванов Иван Иванович',
    recipientPhoneNumber: '+7(000) 000-00-00',
    address: 'ул. Потолочного д. 9',
    description:
      'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
    count: 30,
  },
};

export const ExampleConflict: Story = {
  args: {
    isMobile: false,
    conflict: true,
    category: {
      id: 'id',
      name: 'сопровождение',
      scope: 2,
    },
    date: '2015-05-27T14:10Z',
    avatar: 'https://i.pravatar.cc/300',
    recipientName: 'Иванов Иван Иванович',
    recipientPhoneNumber: '+7(000) 000-00-00',
    address: 'ул. Потолочного д. 9',
    description:
      'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
    count: 30,
  },
};

export const ExampleWithIndefiniteDate: Story = {
  args: {
    isMobile: false,
    category: {
      id: 'id',
      name: 'сопровождение',
      scope: 2,
    },
    avatar: 'https://i.pravatar.cc/300',
    recipientName: 'Иванов Иван Иванович',
    recipientPhoneNumber: '+7(000) 000-00-00',
    address: 'ул. Потолочного д. 9',
    description:
      'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
    count: 30,
  },
};
