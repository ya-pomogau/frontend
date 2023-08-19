import type { Meta, StoryObj } from '@storybook/react';
import { BalanceSettings } from '.';

const meta: Meta<typeof BalanceSettings> = {
  title: 'widgets/BalanceSettings',
  component: BalanceSettings,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  name: 'Balance Settings - Filled',
};
