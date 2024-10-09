import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '.';

const meta: Meta<typeof Typography> = {
  title: 'shared/ui/Typography',
  component: Typography,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    tag: 'p',
    content: 'Hello world',
    variant: "primary_servicesText",
    color: 'black',
  },
};
