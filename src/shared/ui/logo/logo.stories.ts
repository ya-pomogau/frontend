import { Meta, StoryObj } from '@storybook/react';
import { Logo } from '.';

const meta = {
  title: 'uikit/Logo',
  component: Logo,
  tags: ['autodocs'],
} as Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
