import type { Meta, StoryObj } from '@storybook/react';

import Dropdown, { Option } from './index';
import { useState } from 'react';

const meta: Meta<typeof Dropdown> = {
  title: 'uikit/DropDown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Плэйсхолдер',
    },
    items: {
      description: 'Возножные варианты',
    },
    selected: {
      description: 'Объект выбранного значения',
    },
    onChange: {
      description: 'Обработчик события выбора нужного варианта меню',
    },
    label: {
      description: 'Лэйбл над текстом',
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
          _id: '1',
          title: 'Москва',
        },
        {
          _id: '2',
          title: 'Санкт-Петербург',
        },
        {
          _id: '3',
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
