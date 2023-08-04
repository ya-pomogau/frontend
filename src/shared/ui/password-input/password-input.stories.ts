import { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '.';

const meta = {
  title: 'uikit/FormElements/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
    customIcon: {
      type: 'string',
    },
  },
} as Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
    error: false,
  },
};

export const Error: Story = {
  args: {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    placeholder: 'Введите пароль',
    // вот тут вот не работает свойство никоим образом, ошибка не появляется
    error: true,
    errorText: 'Вы ввели неправильный пароль',
  },
};
