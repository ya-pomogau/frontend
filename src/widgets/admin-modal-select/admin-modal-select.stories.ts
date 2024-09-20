import type { Meta, StoryObj } from '@storybook/react';
import { AdminSelectModal } from '.';
import { User } from 'entities/user/types';

const mockAdminsList = [{name: 'Админ Админов'}, {name: 'Семен Семеныч'}, {name: 'Олежа'}]

const meta: Meta<typeof AdminSelectModal> = {
  title: 'widgets/AdminSelectModal',
  component: AdminSelectModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    admins: mockAdminsList as User[],
    isOpen: true,
    onClose: () => {},
    },
};