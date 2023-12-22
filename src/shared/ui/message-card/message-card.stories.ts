import { Meta, StoryObj } from '@storybook/react';
import { MessageCard } from '.';

const meta: Meta<typeof MessageCard> = {
  title: 'uikit/MessageCard',
  component: MessageCard,
  tags: ['autodocs'],
  argTypes: {
    chatmateInfo: {
      description: 'Объект с данными пользователя',
      defaultValue: {},
    },
    massage: {
      description: 'Массив с сообщениями',
    },
    action: {
      description: 'Подсвечивает сообщение',
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
    chatmateInfo: {
      name: 'Иванов Иван Иванович',
      phone: '+7(000) 000-00-00',
      userAvatarLink: 'https://i.pravatar.cc/300',
      userId: '1',
    },
    massage: [
      {
        date: new Date('2023-05-14T21:05:00.000Z'),
        id: 3,
        message: 'Отлично, спасибо, встретимся у 3-го подъезда',
        userAvatarLink: 'https://i.pravatar.cc/300',
        userId: '2',
      },
    ],
    action: false,
    onClick: () => {},
  },
};
