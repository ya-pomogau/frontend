import type { Meta, StoryObj } from '@storybook/react';
import { AdminSelectModal } from '.';
import { userRole } from 'shared/types/common.types';

const adminsMock = [
  {
    id: '1',
    _id: '1',
    name: 'Админов Админ',
    phone: '+7 (902) 123-44-55',
    avatar:
      'https://w-dog.ru/wallpapers/4/16/424328707515423/mel-gibson-xrabroe-serdce-geroj-akter-muzhchina-lico-fon-voin-mel-gibson-chelovek-soldat-direktor.jpg',
    address: 'ул. Стойкости, 17',
    vkId: '123456789',
    role: userRole.ADMIN,
    login: 'admin2@mail.com',
    password: 'uoeft839',
    isActive: true,
    isRoot: false,
    permissions: [],
  },
  {
    id: '2',
    _id: '2',
    name: 'Семен Семенович',
    phone: '+7 (902) 123-44-55',
    avatar:
      'https://w-dog.ru/wallpapers/4/16/424328707515423/mel-gibson-xrabroe-serdce-geroj-akter-muzhchina-lico-fon-voin-mel-gibson-chelovek-soldat-direktor.jpg',
    address: 'ул. Стойкости, 17',
    vkId: '123456789',
    role: userRole.ADMIN,
    login: 'admin2@mail.com',
    password: 'uoeft839',
    isActive: true,
    isRoot: false,
    permissions: [],
  },
  {
    id: '3',
    _id: '3',
    name: 'Олежа',
    phone: '+7 (902) 123-44-55',
    avatar:
      'https://w-dog.ru/wallpapers/4/16/424328707515423/mel-gibson-xrabroe-serdce-geroj-akter-muzhchina-lico-fon-voin-mel-gibson-chelovek-soldat-direktor.jpg',
    address: 'ул. Стойкости, 17',
    vkId: '123456789',
    role: userRole.ADMIN,
    login: 'admin2@mail.com',
    password: 'uoeft839',
    isActive: true,
    isRoot: false,
    permissions: [],
  },
];

const meta: Meta<typeof AdminSelectModal> = {
  title: 'widgets/AdminSelectModal',
  component: AdminSelectModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AdminSelectModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    admins: adminsMock,
  },
};

export const WithoutAdmins: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    admins: [],
  },
};
