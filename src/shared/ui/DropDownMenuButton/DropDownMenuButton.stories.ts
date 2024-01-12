import type { Meta, StoryObj } from '@storybook/react';
import { DropDownMenuButton } from '.';

const meta: Meta<typeof DropDownMenuButton> = {
  title: 'uikit/Buttons/DropDownMenuButton',
  component: DropDownMenuButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Написать администратору',
    onClick: () => console.log('Кнопка нажата'),
    buttonType: 'adminMessage',
  },
};

export const Logout: Story = {
  args: {
    children: 'Выход',
    onClick: () => console.log('Кнопка нажата'),
    buttonType: undefined,
  },
};
