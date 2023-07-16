import { Meta, StoryObj } from '@storybook/react';
import { InputAddress } from '.';
import styles from './styles.module.css';

const meta = {
  title: 'uikit/FormElements/InputAddress',
  component: InputAddress,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
    customIcon: {
      type: 'string',
    },
  },
} as Meta<typeof InputAddress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'address',
    label: 'Адрес',
    error: false,
  },
};

export const Error: Story = {
  args: {
    name: 'address',
    label: 'Адрес',
    error: true,
    errorText:
      'Не введен адрес. Пожалуйста, укажите адрес, по которому требуется помощь!',
  },
};

export const Width350px: Story = {
  args: {
    name: 'address',
    label: 'Адрес',
    error: false,
    extClassName: styles.for_storybook,
  },
};
