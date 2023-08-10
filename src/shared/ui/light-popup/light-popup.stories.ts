import type { Meta, StoryObj } from '@storybook/react';
import { LightPopup } from '.';

const meta: Meta<typeof LightPopup> = {
  title: 'uikit/LightPopup',
  component: LightPopup,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
