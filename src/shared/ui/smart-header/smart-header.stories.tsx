import type { Meta, StoryObj } from '@storybook/react';
import { SmartHeader } from '.';

import { ActiveApplicationIcon } from '../icons/active-application-icon';

const meta: Meta<typeof SmartHeader> = {
  title: 'uikit/SmartHeader',
  component: SmartHeader,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Иконка статуса',
    },
    text: {
      description: 'Текст статуса',
    },
    filter: {
      description: 'Слот для фильтра',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    icon: <ActiveApplicationIcon color="blue" />,
    text: 'Активные заявки',
  },
};

export const NotFilled: Story = {
  args: {},
};
