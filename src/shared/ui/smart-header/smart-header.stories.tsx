import type { Meta, StoryObj } from '@storybook/react';
import { SmartHeader } from '.';
import { FilterIcon } from '../icons/filter-icon';
import { ActiveApplicationIcon } from '../icons/active-application-icon';

const meta: Meta<typeof SmartHeader> = {
  title: 'uikit/SmartHeader',
  component: SmartHeader,
  tags: ['autodocs'],
  argTypes: {
    settingIcon: {
      description: 'Иконка статуса',
    },
    settingText: {
      description: 'Текст статуса',
    },
    filterText: {
      description: 'Текст фильтра',
    },
    filterIcon: {
      description: 'Иконка фильтра',
    },
    onClick: {
      description: 'Обработчик кнопки фильтр',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    settingIcon: <ActiveApplicationIcon color="blue" />,
    settingText: 'Активные заявки',
    filterText: 'Фильтр',
    filterIcon: <FilterIcon color="blue" />,
  },
};

export const NotFilled: Story = {
  args: {},
};
