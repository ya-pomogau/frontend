import type { Meta, StoryObj } from '@storybook/react';

import { EditButton } from '.';

const meta: Meta<typeof EditButton> = {
  title: 'uikit/Buttons/EditButton',
  component: EditButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: { type: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Изменить дату и время',
  },
};
