import { Meta, StoryObj } from '@storybook/react';
import { MessageCard } from '.';
import { mockRecipient } from 'entities/chat/mock-users';

const meta: Meta<typeof MessageCard> = {
  title: 'uikit/MessageCard',
  component: MessageCard,
  tags: ['autodocs'],
  argTypes: {
    user: {
      description: 'Объект с данными пользователя',
      defaultValue: mockRecipient,
    },
    description: {
      type: 'string',
      description: 'Номер телефона пользователя или пояснение',
      defaultValue: mockRecipient.phone,
    },
    unreads: {
      type: 'number',
      description: 'Кол-во непрочитанных сообщений',
      defaultValue: 10,
    },
    action: {
      description: 'Подсвечивает сообщение',
      type: 'boolean',
      defaultValue: false,
    },
    position: {
      description: 'Позиционирование сообщения',
      type: 'boolean',
      defaultValue: false,
    },
    statusConflict: {
      description: 'Заявка конфликта',
      type: 'boolean',
      defaultValue: false,
    },
    onClick: {
      description: 'Функция которая открыват окно с сообщением',
      type: 'function',
      defaultValue: () => {},
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const CardMessage: Story = {
  args: {
    user: mockRecipient,
    description: mockRecipient.phone,
    unreads: 10,
    statusConflict: false,
    action: false,
    position: false,
  },
};
