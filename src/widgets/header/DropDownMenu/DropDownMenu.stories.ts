import type { Meta, StoryObj } from '@storybook/react';
import { DropDownMenu } from '.';
import './styles.module.css';

const meta: Meta<typeof DropDownMenu> = {
  title: 'widgets/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: 'adminMessage',
  decorators: [
    (Story) => (
      <div style = {{ margin: 0 }} >
  <Story/>
  < /div>)
  ],

//args: {
//  menuActive: true,
//    //children: '',
//    //isDisabled: false,
//    //isMobile: false,
//  },
};
