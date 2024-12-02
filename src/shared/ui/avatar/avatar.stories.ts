import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '.';

const meta: Meta<typeof Avatar> = {
  title: 'uikit/Avatar',
  component: Avatar,
  tags: ['autodocs'],

  argTypes: {
    avatarLink: {
      defaultValue: { summary: 'https://i.pravatar.cc/300' },
      description: 'ссылка на картинку аватара',
    },
    avatarName: {
      description: 'значение поля alt',
    },
    extClassName: {
      description: 'классы для дополнительной стилизации',
    },
    variant: {
      description:
        'варианты аватара в завсисмости от места использования, мобильное разрешение учтено',
    },
    extSize: {
      description:
        'размер аватара если такой отсутствует в вариантах стилизации компонента',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MainProfileAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'mainProfile',
  },
};

export const UserCardAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'userCard',
  },
};

export const UserListAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'userList',
  },
};

export const TaskListAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'taskList',
  },
};

export const MapTaskAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'mapTask',
  },
};

export const HeaderAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'headerAvatar',
  },
};

export const ChatTitleAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'chatTitle',
  },
};

export const ChatAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'chatAvatar',
  },
};

export const ConflictChatListAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'conflictList',
  },
};

export const CreateTaskAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'createTask',
  },
};

export const EditProfileAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'editProfile',
  },
};

export const BlogAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    variant: 'blog',
  },
};
