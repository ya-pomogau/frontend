import type { Meta, StoryObj } from '@storybook/react';
import { ButtonWithModal } from '.';

const meta: Meta<typeof ButtonWithModal> = {
  title: 'widgets/ButtonWithModal',
  component: ButtonWithModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <button>Кнопка</button>,
    modalContent: 'Какой-то текст',
  },
};

export const WithCloseButton: Story = {
  args: {
    children: <button>Кнопка</button>,
    modalContent: 'Какой-то текст',
    closeButton: true,
  },
};
