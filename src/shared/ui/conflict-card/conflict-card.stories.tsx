import { Meta, StoryObj } from '@storybook/react';
import { ConflictCard } from '.';

const meta: Meta<typeof ConflictCard> = {
  title: 'uikit/ConflictCard',
  component: ConflictCard,
  tags: ['autodocs'],
  argTypes: {
    optionCard: {
      description: 'Выбор иконки, в зависимости от стороны конфликта',
      type: 'boolean',
      options: ['conflict', 'confirm'],
      control: {
        type: 'radio',
      },
      defaultValue: false,
    },
    specialization: {
      description: 'Выбор специализации',
      options: ['valanter', 'recipient'],
      control: {
        type: 'radio',
      },
      type: 'string',
      defaultValue: 'valanter',
    },
    name: {
      description: 'Имя пользователя',
      type: 'string',
      defaultValue: 'Потапенко Артур Иванович',
    },
    id: {
      description: 'id пользователя',
      type: 'string',
      defaultValue: '23123',
    },
    onClickPhone: {
      description: 'Функция для получения номера телефона пользователя',
      type: 'function',
      defaultValue: () => {},
    },
    onClickMessage: {
      description: 'Функция для открытия чата пользователя',
      type: 'function',
      defaultValue: () => {},
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    optionCard: 'confirm',
    specialization: 'recipient',
    name: 'Петров Петр Петрович',
    image: 'https://i.pravatar.cc/300',
    id: '11111114',
  },
};
