import { Meta, StoryObj } from '@storybook/react';
import { InputPhone } from '.';
import styles from './styles.module.css';

const meta = {
  title: 'uikit/FormElements/InputPhone',
  component: InputPhone,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
  },
} as Meta<typeof InputPhone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'phone',
    label: 'Телефон',
    error: false,
    errorText: 'Некорректный номер телефона',
  },
};

export const Error: Story = {
  args: {
    name: 'phone',
    label: 'Телефон',
    error: true,
    errorText: 'Некорректный номер телефона',
  },
};

export const Width350px: Story = {
  args: {
    name: 'phone',
    label: 'Телефон',
    error: false,
    extClassName: styles.for_storybook,
  },
};
