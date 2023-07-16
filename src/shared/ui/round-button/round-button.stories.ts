import type { Meta, StoryObj } from '@storybook/react';

import { RoundButton } from '.';

const meta: Meta<typeof RoundButton> = {
  title: 'uikit/Buttons/RoundButton',
  component: RoundButton,
  tags: ['autodocs'],
  argTypes: {
    customIcon: { type: 'string' },
    disabled: { type: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PhoneButton: Story = {
  args: {
    buttonType: 'phone',
  },
};

export const MessageButton: Story = {
  args: {
    buttonType: 'message',
  },
};

export const LocationButton: Story = {
  args: {
    buttonType: 'location',
  },
};

export const Disabled: Story = {
  args: {
    buttonType: 'location',
    disabled: true,
  },
};

export const AddButton: Story = {
  args: {
    buttonType: 'add',
  },
};

export const DefaultButton: Story = {
  args: {
    buttonType: 'default',
    size: 'small',
  },
};
