import { StoryObj } from '@storybook/react';
import { GradientDivider } from '.';

const meta = {
  title: 'uikit/GradientDivider',
  component: GradientDivider,
  tags: ['autodocs'],
  argTypes: {
    extClassName: {
      description: 'Класс для элемента',
      defaultValue: '',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
