import type { Meta, StoryObj } from '@storybook/react';
import { TimePickerElement } from '.';

const meta: Meta<typeof TimePickerElement> = {
  title: 'uikit/TimePickerElement',
  component: TimePickerElement,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Mobile: Story = {};

export const MobileTypeButton: Story = {};
