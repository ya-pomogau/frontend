import type { Meta, StoryObj } from '@storybook/react';

import { EditViewerInfo } from '.';

const meta: Meta<typeof EditViewerInfo> = {
  title: 'features/EditViewerInfo',
  component: EditViewerInfo,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
