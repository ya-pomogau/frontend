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
      description: 'размеры аватара, мобильное разрешение не учтено',
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
    avatarLink:
      'https://ltdfoto.ru/images/2024/12/05/FOTO-06.11.2023-00.52.jpg',
    size: 'large',
    variant: 'square',
  },
};

export const LargeAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'large',
  },
};

export const BigAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'big',
  },
};

export const AverageAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'average',
  },
};

export const MediumAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'medium',
  },
};

export const SmallAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'small',
  },
};

export const TinyAvatar: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
    size: 'tiny',
  },
};
