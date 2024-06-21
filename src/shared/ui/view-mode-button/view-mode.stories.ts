import type { Meta, StoryObj } from '@storybook/react';

import { ViewModeButton } from '.';

const meta: Meta<typeof ViewModeButton> = {
  title: 'uikit/Buttons/ViewModeButton',
  component: ViewModeButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: { type: 'boolean' },
    modeIcon: {
      control: {
        type: 'radio',
      },
      options: ['list', 'tiles'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modeIcon: 'list',
  },
};

export const ListMode: Story = {
  args: {
    modeIcon: 'list',
  },
};

export const TilesMode: Story = {
  args: {
    modeIcon: 'tiles',
  },
};
