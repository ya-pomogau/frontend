import type { Meta, StoryObj } from '@storybook/react';

import { PopupChat } from '.';
import { mockChatMessages } from 'entities/chat/mock-messages';
import { mockVolunteer } from 'entities/chat/mock-users';

const meta: Meta<typeof PopupChat> = {
  title: 'entities/PopupChat',
  component: PopupChat,
  tags: ['autodocs'],
  argTypes: {
    messages: {
      description: 'Массив с сообщениями',
      defaultValue: mockChatMessages,
    },
    chatmateInfo: {
      description: 'Информация пользователя который нам написал',
      type: 'function',
      defaultValue: mockVolunteer,
    },
    onAttachFileClick: {
      description: 'Функция которая закрепляет файл',
      type: 'function',
      defaultValue: () => {},
    },
    onMessageSend: {
      description: 'Функция которая отправляет новое сообщение',
      type: 'function',
      defaultValue: () => {},
    },
    isOpen: {
      description: 'Открывает и закрывает Popup',
      type: 'boolean',
      defaultValue: true,
    },
    onClick: {
      description: 'Функция для закрытия и открытия чата',
      type: 'function',
      defaultValue: () => {},
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Popup: Story = {
  args: {
    messages: mockChatMessages,
    chatmateInfo: mockVolunteer,
    onAttachFileClick: () => {},
    onMessageSend: () => {},
    isOpen: true,
    onClick: () => {},
  },
};
