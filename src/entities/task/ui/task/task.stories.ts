import { Meta, StoryObj } from '@storybook/react';
import { TaskItem } from '.';
import { ResolveStatus, TaskReport, TaskStatus } from 'entities/task/types';
import { UserRole } from 'shared/types/common.types';

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
      location: [12, 1234],
      status: TaskStatus.CREATED,
      recipientReport: TaskReport.FULFILLED,
      volunteerReport: TaskReport.FULFILLED,
      adminResolve: ResolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        vkId: '145',
        role: UserRole.VOLUNTEER,
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
        vkId: '123',
        role: UserRole.RECIPIENT,
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
      },
    },
  },
};

export const Mobile: Story = {
  args: {
    item: {
      _id: '1234',
      location: [12, 1234],
      status: TaskStatus.CREATED,
      recipientReport: TaskReport.FULFILLED,
      volunteerReport: TaskReport.FULFILLED,
      adminResolve: ResolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        vkId: '145',
        role: UserRole.VOLUNTEER,
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
        vkId: '123',
        role: UserRole.RECIPIENT,
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
      },
    },
  },
};

export const ExampleWithNoRecipient: Story = {
  args: {
    item: {
      _id: '1234',
      location: [12, 1234],
      status: TaskStatus.CREATED,
      recipientReport: TaskReport.FULFILLED,
      volunteerReport: TaskReport.FULFILLED,
      adminResolve: ResolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        vkId: '145',
        role: UserRole.VOLUNTEER,
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
        vkId: '123',
        role: UserRole.RECIPIENT,
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
      },
    },
  },
};

export const ExampleConfirmed: Story = {
  args: {
    item: {
      _id: '1234',
      location: [12, 1234],
      status: TaskStatus.CREATED,
      recipientReport: TaskReport.FULFILLED,
      volunteerReport: TaskReport.FULFILLED,
      adminResolve: ResolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        vkId: '145',
        role: UserRole.VOLUNTEER,
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
        vkId: '123',
        role: UserRole.RECIPIENT,
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
      },
    },
  },
};

export const ExampleConflict: Story = {
  args: {
    item: {
      _id: '1234',
      location: [12, 1234],
      status: TaskStatus.CREATED,
      recipientReport: TaskReport.FULFILLED,
      volunteerReport: TaskReport.FULFILLED,
      adminResolve: ResolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        vkId: '145',
        role: UserRole.VOLUNTEER,
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
        vkId: '123',
        role: UserRole.RECIPIENT,
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
      },
    },
  },
};

export const ExampleWithIndefiniteDate: Story = {
  args: {
    item: {
      _id: '1234',
      location: [12, 1234],
      status: TaskStatus.CREATED,
      recipientReport: TaskReport.FULFILLED,
      volunteerReport: TaskReport.FULFILLED,
      adminResolve: ResolveStatus.FULFILLED,
      isPendingChanges: false,
      volunteer: {
        name: '',
        avatar: '',
        address: '',
        phone: '',
        vkId: '145',
        role: UserRole.VOLUNTEER,
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
        vkId: '123',
        role: UserRole.RECIPIENT,
        avatar: 'https://i.pravatar.cc/300',
        name: 'Петров Петр Петрович',
        phone: '+7(000) 000-00-00',
      },
    },
  },
};
