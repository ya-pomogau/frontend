import type { Meta, StoryObj } from '@storybook/react';

import { Chat } from '.';
import { getMockMessages } from './libs/utils';

const meta: Meta<typeof Chat> = {
  title: 'entities/Chat',
  component: Chat,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chatmateInfo: {
      userId: '1',
      name: 'Иванов Иван Иванович',
      phone: '+7(000) 000-00-00',
      userAvatarLink: 'https://i.pravatar.cc/300',
    },
    messages: getMockMessages(),
  },
};
