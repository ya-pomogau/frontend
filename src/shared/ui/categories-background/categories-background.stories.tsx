import type { Meta, StoryObj } from '@storybook/react';

import { CategoriesBackground } from '.';

const meta: Meta<typeof CategoriesBackground> = {
  title: 'uikit/CategoriesBackground',
  component: CategoriesBackground,
  tags: ['autodocs'],
  argTypes: {
    content: { type: 'string' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    theme: 'secondary',
  },
};

export const Success: Story = {
  args: {
    theme: 'success',
  },
};

export const Warning: Story = {
  args: {
    theme: 'warning',
  },
};

export const WithLabel: Story = {
  args: {
    theme: 'primary',
    content: 'категория',
    size: 'medium',
  },
};
