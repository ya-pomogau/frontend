import type { Meta, StoryObj } from '@storybook/react';
import { InfoContainerContent } from '.';

const meta: Meta<typeof InfoContainerContent> = {
  title: 'uikit/InfoContainerContent',
  component: InfoContainerContent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Иванов Иван Иванович',
    id: 112233,
    phone: '+7(000) 000 000',
    address: 'ул. Цветной бульвар, 43',
  },
};
