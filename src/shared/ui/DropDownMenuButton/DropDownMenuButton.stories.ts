import type { Meta, StoryObj } from '@storybook/react';
import { DropDownMenuButton } from '.';
import './DropDownMenuButton.module.css';

const MenuButton: Meta<typeof DropDownMenuButton> = {
  title: 'uikit/Buttons/DropDownMenuButton',
  component: DropDownMenuButton,
  tags: ['autodocs'],
};

export default MenuButton;
type Story = StoryObj<typeof DropDownMenuButton>;

export const Primary: Story = {
  name: 'adminMessage',
  args: {
    children: 'Написать администратору',
    onClick: () => console.log('Кнопка нажата'),
    buttonType: 'adminMessage',
    isDisabled: false,
    isMobile: false,
  },
};

export const Logout: Story = {
  args: {
    children: 'Выход',
    onClick: () => console.log('Выход из аккаунта'),
  },
};
