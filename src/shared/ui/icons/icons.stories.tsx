import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '.';

const meta: Meta<typeof Icon> = {
  title: 'uikit/Icons',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  args: {
    color: 'blue',
    size: '24',
    icon: 'CalendarIcon',
  },
};
