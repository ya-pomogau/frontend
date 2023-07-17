import { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '.';

import styles from './styles.module.css';

const meta = {
  title: 'uikit/FormElements/TextArea',
  component: TextArea,
  tags: ['autodocs'],
} as Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'task',
    label: 'Опишите задачу',
    placeholder: 'Например: Помогите выгулять собаку.',
  },
};

export const Size440x170px: Story = {
  args: {
    name: 'task',
    label: 'Опишите задачу',
    placeholder: 'Например: Помогите выгулять собаку.',
    extClassName: styles.for_storybook,
  },
};
