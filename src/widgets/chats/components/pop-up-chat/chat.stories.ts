import type { Meta, StoryObj } from '@storybook/react';

import { PopUpChat } from './index';
import { getMockMessages } from '../../libs/utils';

const meta: Meta<typeof PopUpChat> = {
  title: 'widgets/chats/components/pop-up-chat',
  component: PopUpChat,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chatMateInfo: {
      name: 'Иванов Иван Иванович',
      userId: 1,
      avatar: 'https://i.pravatar.cc/300',
      phone: '+7(000) 000-00-00',
    },
    messages: getMockMessages(),
  },
};
