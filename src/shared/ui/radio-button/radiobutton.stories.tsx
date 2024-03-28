import type { Meta, StoryObj } from '@storybook/react';
import RadioButton from 'shared/ui/radio-button';

const meta: Meta<typeof RadioButton> = {
  title: 'uikit/FormElements/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Радиокнопки для форм и фильтров',
      },
    },
  },
  argTypes: {
    label: {
      description: 'Текст для кнопки',
      required: true,
    },
    checked: {
      description: 'Состояние радиокнопки',
      options: [false, true],
      control: { type: 'radio' },
    },
    disabled: {
      description: 'Неактивная (заблокированная) радиокнопка',
      options: [false, true],
      control: { type: 'radio' },
    },
    id: {
      description: 'Обязательно указывать id',
    },
    name: {
      description: 'Указывать одинаковый name для группы радиокнопок',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const DefaultRadioButton: Story = {
  args: {
    label: '1km',
    disabled: false,
    id: 'test-1',
  },
};

export const CheckedRadioButton: Story = {
  args: {
    defaultChecked: true,
    label: '1km',
    disabled: false,
    id: 'test-2',
  },
};

export const DisabledRadioButton: Story = {
  args: {
    disabled: true,
    label: '1km',
    id: 'test-3',
  },
};

export const GroupRadioButtons = () => (
  <>
    <RadioButton label="1 km" name="group" id="test-4" />
    <RadioButton label="5 km" name="group" id="test-5" defaultChecked />
    <RadioButton label="113 km" name="group" id="test-6" disabled />
  </>
);
