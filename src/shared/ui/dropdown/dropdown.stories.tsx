import type { Meta, StoryObj } from '@storybook/react';

import Dropdown, { Option } from './index';
import { useState } from 'react';

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
    label: {
      description: 'Лэйбл над текстом',
    },
    selected: {
      description: 'Объект выбранного значения',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DropDownWithHooks = () => {
  const [selected, setSelected] = useState<Option | undefined>(undefined);

  return (
    <Dropdown
      label={'Город'}
      placeholder={'Выберите город'}
      items={[
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
      ]}
      onChange={setSelected}
      selected={selected}
    />
  );
};
export const Example: Story = {
  render: () => <DropDownWithHooks />,
};
