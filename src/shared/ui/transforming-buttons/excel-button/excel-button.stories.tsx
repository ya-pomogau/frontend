import type { Meta, StoryObj } from '@storybook/react';
import { ExcelButton } from '.';

const meta = {
  title: 'uikit/Buttons/ExcelButton',
  component: ExcelButton,
  tags: ['autodocs'],
} satisfies Meta<typeof ExcelButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
