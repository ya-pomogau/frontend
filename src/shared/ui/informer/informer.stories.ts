import type { Meta, StoryObj } from '@storybook/react';

import { Informer } from '.';

const meta: Meta<typeof Informer> = {
  title: 'uikit/Informer',
  component: Informer,
  tags: ['autodocs'],
  argTypes: {
    icon: { type: 'string' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithText: Story = {
  args: {
    text: 'У Вас пока нет открытых заявок',
  },
};

export const WithoutText: Story = {};
