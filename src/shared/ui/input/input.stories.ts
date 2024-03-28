import { Meta, StoryObj } from '@storybook/react';
import { Input } from '.';

import styles from './styles.module.css';

const meta = {
  title: 'uikit/FormElements/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
    customIcon: {
      type: 'string',
    },
  },
} as Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    name: 'firstName',
    label: 'Имя',
    placeholder: 'Введите имя',
    error: false,
  },
};

export const Error: Story = {
  args: {
    type: 'text',
    name: 'firstName',
    label: 'Имя',
    placeholder: 'Введите имя',
    error: true,
    errorText:
      'Имя должно содержать какие-то символы, а оно содержит что-то не то. Какая длинная ошибка, ого!',
  },
};

export const Width350px: Story = {
  args: {
    type: 'text',
    name: 'firstName',
    label: 'Имя',
    placeholder: 'Введите имя',
    error: false,
    extClassName: styles.for_storybook,
  },
};
