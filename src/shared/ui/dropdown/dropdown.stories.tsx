import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'uikit/DropDown',
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    placeholder: 'выберите город',
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
