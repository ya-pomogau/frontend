import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';
import { VkIcon } from '../icons/vk-icon';

const meta: Meta<typeof Button> = {
  title: 'uikit/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    disabled: { type: 'boolean' },
    customIcon: { type: 'string' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    buttonType: 'primary',
    label: 'Применить',
  },
};

export const Secondary: Story = {
  args: {
    buttonType: 'secondary',
    label: 'Заблокировать',
    size: 'medium',
  },
};

export const PartialFill: Story = {
  args: {
    buttonType: 'partial',
    label: 'Подтвердить',
  },
};

export const Disabled: Story = {
  args: {
    buttonType: 'primary',
    label: 'Применить',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    buttonType: 'primary',
    label: 'Войти через ВКонтакте',
    size: 'extraLarge',
    customIcon: <VkIcon size="24" color="white" />,
  },
};
