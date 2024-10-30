import { Meta, StoryObj } from '@storybook/react';
import { TaskItem } from '.';
import { resolveStatus, taskReport, taskStatus } from 'entities/task/types';
import { userRole } from 'shared/types/common.types';

const meta = {
  title: 'Entities/TaskItem',
  component: TaskItem,
  tags: ['autodocs'],
} as Meta<typeof TaskItem>;

export default meta;

type Story = StoryObj<typeof meta>;

//TODO Привести сторибук в актуальное состояние после измнения Task
export const Desktop: Story = {
  args: {
    item: {
      _id: '1234',
      location: {
        type: 'Point',
        coordinates: [12, 1234],
      },
      status: taskStatus.CREATED,
      recipientReport: taskReport.FULFILLED,
      volunteerReport: taskReport.FULFILLED,
      adminResolve: resolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        _id: '7',
        vkId: '123456789',
        role: userRole.VOLUNTEER,
      },
      category: {
        _id: 'id',
        title: 'сопровождение',
        points: 2,
        accessLevel: 1,
      },
      date: '2023-05-27T14:10Z',
      address: 'ул. Потолочного д. 9',
      description:
        'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
      recipient: {
        address: '',
        _id: '6',
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
        vkId: '123456789',
        role: userRole.RECIPIENT,
      },
      moderator: null,
    },
  },
};

export const Mobile: Story = {
  args: {
    item: {
      _id: '1234',
      location: {
        type: 'Point',
        coordinates: [12, 1234],
      },
      status: taskStatus.CREATED,
      recipientReport: taskReport.FULFILLED,
      volunteerReport: taskReport.FULFILLED,
      adminResolve: resolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        _id: '5',
        vkId: '123456789',
        role: userRole.VOLUNTEER,
      },
      category: {
        _id: 'id',
        title: 'сопровождение',
        points: 2,
        accessLevel: 1,
      },
      date: '2023-05-27T14:10Z',
      address: 'ул. Потолочного д. 9',
      description:
        'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
      recipient: {
        address: '',
        _id: '4',
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
        vkId: '123456789',
        role: userRole.RECIPIENT,
      },
      moderator: null,
    },
  },
};

export const ExampleWithNoRecipient: Story = {
  args: {
    item: {
      _id: '1234',
      location: {
        type: 'Point',
        coordinates: [12, 1234],
      },
      status: taskStatus.CREATED,
      recipientReport: taskReport.FULFILLED,
      volunteerReport: taskReport.FULFILLED,
      adminResolve: resolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        _id: '3',
        vkId: '123456789',
        role: userRole.VOLUNTEER,
      },
      category: {
        _id: 'id',
        title: 'сопровождение',
        points: 2,
        accessLevel: 1,
      },
      date: '2023-05-27T14:10Z',
      address: 'ул. Потолочного д. 9',
      description:
        'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
      recipient: {
        address: '',
        _id: '3',
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
        vkId: '123456789',
        role: userRole.RECIPIENT,
      },
      moderator: null,
    },
  },
};

export const ExampleConfirmed: Story = {
  args: {
    item: {
      _id: '1234',
      location: {
        type: 'Point',
        coordinates: [12, 1234],
      },
      status: taskStatus.CREATED,
      recipientReport: taskReport.FULFILLED,
      volunteerReport: taskReport.FULFILLED,
      adminResolve: resolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        _id: '1',
        vkId: '123456789',
        role: userRole.VOLUNTEER,
      },
      category: {
        _id: 'id',
        title: 'сопровождение',
        points: 2,
        accessLevel: 1,
      },
      date: '2023-05-27T14:10Z',
      address: 'ул. Потолочного д. 9',
      description:
        'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
      recipient: {
        address: '',
        _id: '1',
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
        vkId: '123456789',
        role: userRole.RECIPIENT,
      },
      moderator: null,
    },
  },
};

export const ExampleConflict: Story = {
  args: {
    item: {
      _id: '1234',
      location: {
        type: 'Point',
        coordinates: [12, 1234],
      },
      status: taskStatus.CREATED,
      recipientReport: taskReport.FULFILLED,
      volunteerReport: taskReport.FULFILLED,
      adminResolve: resolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        _id: '1',
        vkId: '123456789',
        role: userRole.VOLUNTEER,
      },
      category: {
        _id: 'id',
        title: 'сопровождение',
        points: 2,
        accessLevel: 1,
      },
      date: '2023-05-27T14:10Z',
      address: 'ул. Потолочного д. 9',
      description:
        'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
      recipient: {
        address: '',
        _id: '3',
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
        vkId: '123456789',
        role: userRole.RECIPIENT,
      },
      moderator: null,
    },
  },
};

export const ExampleWithIndefiniteDate: Story = {
  args: {
    item: {
      _id: '1234',
      location: {
        type: 'Point',
        coordinates: [12, 1234],
      },
      status: taskStatus.CREATED,
      recipientReport: taskReport.FULFILLED,
      volunteerReport: taskReport.FULFILLED,
      adminResolve: resolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        _id: '2',
        vkId: '123456789',
        role: userRole.VOLUNTEER,
      },
      category: {
        _id: 'id',
        title: 'сопровождение',
        points: 2,
        accessLevel: 1,
      },
      date: '2023-05-27T14:10Z',
      address: 'ул. Потолочного д. 9',
      description:
        'Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.',
      recipient: {
        _id: '1',
        address: '',
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
        vkId: '123456789',
        role: userRole.RECIPIENT,
      },
      moderator: null,
    },
  },
};
