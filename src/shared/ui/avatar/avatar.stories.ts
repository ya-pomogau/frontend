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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    avatarName: 'Avatar',
    avatarLink: 'https://i.pravatar.cc/300',
  },
};
