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
          value: '1',
          label: 'Москва',
        },
        {
          value: '2',
          label: 'Санкт-Петербург',
        },
        {
          value: '3',
          label: 'Екатеринбург',
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
