import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from '.';

const meta: Meta<typeof ArrowButton> = {
  title: 'uikit/Buttons/ArrowButton',
  component: ArrowButton,
  tags: ['autodocs'],
  argTypes: {
    customIcon: { type: 'string' },
    disabled: { type: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Поиск',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Поиск',
    disabled: true,
  },
};
