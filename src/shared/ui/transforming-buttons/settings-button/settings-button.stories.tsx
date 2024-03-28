import type { Meta, StoryObj } from '@storybook/react';
import { SettingsButton } from '.';

const meta: Meta<typeof SettingsButton> = {
  title: 'uikit/Buttons/SettingsButton',
  component: SettingsButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
