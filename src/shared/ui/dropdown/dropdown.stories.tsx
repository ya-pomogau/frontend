import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'uikit/DropDown/DropDown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    onChange: {
      description: 'Обработчик события выбора нужного варианта меню',
    },
    placeholder: {
      description: 'Плэйсхолдер',
    },
    items: {
      description: 'Возножные варианты',
    },
    selected: {
      description: 'Выбранный вариант',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    placeholder: 'выберите задачу',
    items: [
      {
        id: 1,
        title: 'Москва',
      },
      {
        id: 2,
        title: 'Санкт-Петербург',
      },
      {
        id: 3,
        title: 'Екатеринбург',
      },
    ],
  },
};
