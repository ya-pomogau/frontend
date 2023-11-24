import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '.';

const meta: Meta<typeof Accordion> = {
  title: 'uikit/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    name: 'anyInputName',
    arrayOptions: [
      { value: 'new', label: 'Новый' },
      { value: 'activ', label: 'Активный' },
      { value: 'notActive', label: 'Не активный' },
      { value: 'blocked', label: 'Заблокированный' },
    ],
    placeholder: 'Header text',
    onChange: (value: string) => {
      console.log('Записали это значение');
    },
  },
};
