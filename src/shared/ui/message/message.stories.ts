import type { Meta, StoryObj } from '@storybook/react';

import { Message } from '.';

const meta: Meta<typeof Message> = {
  title: 'uikit/Message',
  component: Message,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const IncomingMessage: Story = {
  args: {
    type: 'incoming',
    messageText: 'Здравствуйте, я буду сопровождать вас на мероприятии',
    avatarLink: 'https://i.pravatar.cc/300',
  },
};

export const OutgoingMessage: Story = {
  args: {
    type: 'outgoing',
    messageText: 'Отлично, спасибо, встретимся у 3-го подъезда',
    avatarLink: 'https://i.pravatar.cc/300',
  },
};
