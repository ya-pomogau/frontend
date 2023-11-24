import type { Meta, StoryObj } from '@storybook/react';
import { ErrorDialog } from '.';

const meta: Meta<typeof ErrorDialog> = {
  title: 'uikit/ErrorDialog',
  component: ErrorDialog,
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'Заголовок для approve-диалога',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const AlertDialog: Story = {
  args: {
    text: 'Отсутствует подключение к интернету',
  },
};
