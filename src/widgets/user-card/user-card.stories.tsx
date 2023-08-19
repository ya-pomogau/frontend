import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from '.';

const meta: Meta<typeof UserCard> = {
  title: 'widgets/UserCard',
  component: UserCard,
  tags: ['autodocs'],

  argTypes: {
    extClassName: {
      description: 'классы для дополнительной стилизации',
    },
    avatarLink: {
      defaultValue: { summary: 'https://i.pravatar.cc/300' },
      description: 'ссылка на картинку аватара',
    },
    avatarName: {
      description: 'значение поля alt для аватара',
    },
    userName: {
      description: 'ФИО пользователя',
    },
    userId: {
      description: 'ID пользователя',
    },
    userNumber: {
      description: 'номер телефона пользователя',
    },
    children: {
      description:
        'компонент с кнопками для предоставления доступов пользователям',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    userName: 'Иванов Иван Иванович',
    userId: 123456789,
    userNumber: '+7 (111) 222-22-22',
  },
};

export const VolunteerUserCardFirst: Story = {
  args: {
    role: 'volunteer',
    avatarName: 'Volunteer Avatar',
    userName: 'Иванов Иван Иванович',
    userId: 12345,
    userNumber: '+1 (123) 456-7890',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },
};

export const VolunteerUserCardSecond: Story = {
  args: {
    role: 'volunteer',
    avatarName: 'Volunteer Avatar',
    userName: 'Иванов Иван Иванович',
    userId: 12345,
    userNumber: '+1 (123) 456-7890',
    volunteerInfo: {
      approved: true,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 40,
    },
  },
};

export const VolunteerUserCardThird: Story = {
  args: {
    role: 'volunteer',
    avatarName: 'Volunteer Avatar',
    userName: 'Иванов Иван Иванович',
    userId: 12345,
    userNumber: '+1 (123) 456-7890',
    volunteerInfo: {
      approved: true,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 65,
    },
  },
};

export const VolunteerUserCardForth: Story = {
  args: {
    role: 'volunteer',
    avatarName: 'Volunteer Avatar',
    userName: 'Иванов Иван Иванович',
    userId: 12345,
    userNumber: '+1 (123) 456-7890',
    volunteerInfo: {
      approved: true,
      checked: true,
      keys: true,
      adminStatus: null,
      scores: 100,
    },
  },
};

export const RecipientUserCardFirst: Story = {
  args: {
    role: 'recipient',
    avatarName: 'Recipient Avatar',
    userName: 'Иванов Иван Иванович',
    userId: 67890,
    userNumber: '+1 (987) 654-3210',
    volunteerInfo: {
      approved: false,
    },
  },
};

export const RecipientUserCardSecond: Story = {
  args: {
    role: 'recipient',
    avatarName: 'Recipient Avatar',
    userName: 'Иванов Иван Иванович',
    userId: 67890,
    userNumber: '+1 (987) 654-3210',
    volunteerInfo: {
      approved: true,
    },
  },
};

export const AdminUserCardFirst: Story = {
  args: {
    role: 'admin',
    avatarName: 'Recipient Avatar',
    userName: 'Иванов Иван Иванович',
    userId: 67890,
    userNumber: '+1 (987) 654-3210',
    volunteerInfo: {
      approved: true,
    },
  },
};
