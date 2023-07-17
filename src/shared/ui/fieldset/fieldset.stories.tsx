import type { Meta, StoryObj } from '@storybook/react';
import Fieldset from './index';
import { FieldsetView } from './utils';
import Checkbox from '../checkbox';
import RadioButton from '../radio-button';

const meta: Meta<typeof Fieldset> = {
  title: 'uikit/FormElements/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Используется для группировки нескольких элементов (формы, фильтры)',
      },
    },
  },
  argTypes: {
    title: {
      name: 'title',
      type: { name: 'string', required: true },
      description: 'Заголовок для группы элементов',
      table: {
        type: { summary: 'string' },
      },
    },
    view: {
      name: 'view',
      type: { name: 'string', required: true },
      options: [
        FieldsetView.ROW,
        FieldsetView.COLUMN,
        FieldsetView.TWO_COLUMNS,
      ],
      control: { type: 'select' },
      defaultValue: { summary: FieldsetView.ROW },
      description:
        'Один из возможных типов отображения: 1 строка, 1 столбец, 2 столбца',
      table: {
        type: { summary: "'ROW' |'COLUMN' | 'TWO_COLUMNS'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;
export const DedaultFieldset: Story = {
  args: {
    title: 'Заголовок',
  },
};
export const FieldsetOneColumn: Story = {
  render: (args) => (
    <Fieldset {...args} view={FieldsetView.COLUMN}>
      <Checkbox label="По дате" id="11" />
      <Checkbox label="По убывающей цене" id="12" checked />
      <Checkbox label="По возрастающей цене" id="13" />
    </Fieldset>
  ),
  args: {
    title: 'Отображать',
  },
};

export const FieldsetOneRow: Story = {
  render: (args) => (
    <Fieldset {...args} view={FieldsetView.ROW}>
      <RadioButton label="1км" id="31" name="3" defaultChecked />
      <RadioButton label="2км" id="32" name="3" />
      <RadioButton label="5км" id="33" name="3" />
    </Fieldset>
  ),
  args: {
    title: 'Радиус поиска',
  },
};

export const FieldsetTwoColumns: Story = {
  render: (args) => (
    <Fieldset {...args} view={FieldsetView.TWO_COLUMNS}>
      <Checkbox label="Категория 1" id="21" checked />
      <Checkbox label="Категория 2" id="22" />
      <Checkbox label="Категория 3" id="23" />
      <Checkbox label="Категория 4" id="24" checked />
      <Checkbox label="Категория 5" id="25" />
      <Checkbox label="Категория 6" id="26" />
    </Fieldset>
  ),
  args: {
    title: 'Категория',
  },
};
