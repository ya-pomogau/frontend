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
    size: {
      description: 'размеры аватара, мобильное разрешение учтено',
    },
    variant: {
      description: 'форма аватара',
    },
    extSize: {
      description:
        'размер аватара если такой отсутствует в вариантах стилизации компонента',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SquareAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'large',
    variant: 'square',
  },
};

export const MainProfileAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'large',
  },
};

export const UserCardAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'big',
  },
};

export const UserListAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'bigResize',
  },
};

export const TaskListAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'small',
  },
};

export const MapTaskAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'mediumResize',
  },
};

export const HeaderAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'mediumResize',
  },
};

export const ChatTitleAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'small',
  },
};

export const ChatAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'tiny',
  },
};

export const ConflictChatListAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'average',
  },
};

export const CreateTaskAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'averageResizeBig',
  },
};

export const EditProfileAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'averageResizeSmall',
  },
};

export const BlogAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'medium',
  },
};
