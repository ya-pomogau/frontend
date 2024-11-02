import { Meta, StoryObj } from '@storybook/react';
import { Select } from '.';

import styles from './styles.module.css';

const meta = {
  title: 'uikit/FormElements/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    errorText: {
      control: 'text',
      defaultValue: 'Ошибка выбора задачи',
    },
  },
} as Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'tasks',
    label: 'Выберите тип задачи',
    placeholder: 'Выберите тип задачи',
    selectPlaceholder: true,
    options: [
      { value: 'Задача 1', label: 'Задача 1' },
      { value: 'Задача 2', label: 'Задача 2' },
      { value: 'Задача 3', label: 'Задача 3' },
    ],
    error: false,
    errorText: 'Ошибка выбора задачи',
  },
};

export const Error: Story = {
  args: {
    name: 'tasks',
    label: 'Выберите тип задачи',
    placeholder: 'Выберите тип задачи',
    options: [
      { value: 'Задача 1', label: 'Задача 1' },
      { value: 'Задача 2', label: 'Задача 2' },
      { value: 'Задача 3', label: 'Задача 3' },
    ],
    error: true,
  },
};

export const Width350px: Story = {
  args: {
    name: 'tasks',
    label: 'Выберите тип задачи',
    placeholder: 'Выберите тип задачи',
    options: [
      { value: 'Задача 1', label: 'Задача 1' },
      { value: 'Задача 2', label: 'Задача 2' },
      { value: 'Задача 3', label: 'Задача 3' },
    ],
    error: false,
    extClassName: styles.for_storybook,
  },
};
