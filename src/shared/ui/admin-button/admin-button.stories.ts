import type { Meta, StoryObj } from '@storybook/react';

import { AdminButton } from '.';

const meta: Meta<typeof AdminButton> = {
  title: 'uikit/Buttons/AdminButton',
  component: AdminButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Написать администратору',
    onClick: () => console.log('Кнопка нажата'),
  },
};
