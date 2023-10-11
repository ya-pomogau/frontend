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
    options: [
      { value: 'Задача 1', label: 'Задача 1' },
      { value: 'Задача 2', label: 'Задача 2' },
      { value: 'Задача 3', label: 'Задача 3' },
    ],
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
    extClassName: styles.for_storybook,
  },
};
