import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'uikit/DropDown/DropDown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    items: ['1', '2', '3', '4'],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    placeholder: 'выберите задачу',
    items: ['1', '2', '3', '4'],
  },
};
