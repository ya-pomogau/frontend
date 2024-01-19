import type { Meta, StoryObj } from '@storybook/react';
import Skeliton from '.';

const meta: Meta<typeof Skeliton> = {
  title: 'skelitons/Skeliton/User',
  component: Skeliton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      type: 'string',
      description: 'Вариант скелитона',
      defaultValue: 'avatar',
      options: ['avatar', 'userInfo'],
      control: {
        type: 'radio',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Avatar: Story = {
  args: {
    variant: 'avatar',
  },
};

export const UserInfo: Story = {
  args: {
    variant: 'userInfo',
  },
};
