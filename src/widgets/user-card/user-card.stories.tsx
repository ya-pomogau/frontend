import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from '.';
import { AdminPermission, UserRole } from '../../shared/types/common.types';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { userModel } from 'entities';

const mockedUserData = {
  phone: '+1 (123) 456-7890',
  avatar: 'https://thispersondoesnotexist.com',
  address: 'ул. Кораблестроителей, 19к1',
  location: [59.942575, 30.216757],
};

const Mockstore = ({ children }: Record<any, any>) => (
  <Provider
    store={configureStore({
      reducer: {
        user: userModel.reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof UserCard> = {
  title: 'widgets/UserCard',
  component: UserCard,
  tags: ['autodocs'],

  argTypes: {
    user: {
      description: 'Объект пользователя',
    },
    viewMode: {
      description: 'Вариант отображения карточки',
    },
  },
  args: {
    viewMode: 'list',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Admin: Story = {
  args: {
    user: {
      ...mockedUserData,
      _id: '14',
      name: 'Админский Админ Админович',
      vkId: '14',
      role: UserRole.ADMIN,
      status: 3,
      permissions: [AdminPermission.CONFIRMATION, AdminPermission.CONFLICTS],
    },
  },
  render: ({ ...args }) => (
    <Mockstore>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const VolunteerBlocked: Story = {
  args: {
    user: {
      ...mockedUserData,
      _id: '7',
      name: 'Заблокированный Волонтер Иванович',
      vkId: '123456789',
      role: UserRole.VOLUNTEER,
      score: 40,
      status: -1,
      keys: false,
    },
  },
  render: ({ ...args }) => (
    <Mockstore>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const VolunteerUnconfirmed: Story = {
  args: {
    user: {
      ...mockedUserData,
      _id: '8',
      name: 'Неподтвержденный Волонтер Иванович',
      vkId: '123456789',
      role: UserRole.VOLUNTEER,
      score: 40,
      status: 0,
      keys: false,
    },
  },
  render: ({ ...args }) => (
    <Mockstore>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const VolunteerConfirmed: Story = {
  args: {
    user: {
      ...mockedUserData,
      _id: '9',
      name: 'Проверенный Волонтер Бесключникович',
      vkId: '9',
      role: UserRole.VOLUNTEER,
      score: 2500,
      status: 2,
      keys: false,
    },
  },
  render: ({ ...args }) => (
    <Mockstore>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const VolunteerVerifiedWithKeys: Story = {
  args: {
    user: {
      ...mockedUserData,
      _id: '10',
      name: 'Проверенный Ключник Волонтерович',
      vkId: '10',
      role: UserRole.VOLUNTEER,
      score: 2500,
      status: 2,
      keys: true,
    },
  },
  render: ({ ...args }) => (
    <Mockstore>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const VolunteerActivated: Story = {
  args: {
    user: {
      ...mockedUserData,
      _id: '11',
      name: 'Активированный Ключник Волонтерович',
      vkId: '11',
      role: UserRole.VOLUNTEER,
      score: 2500,
      status: 3,
      keys: true,
    },
  },
  render: ({ ...args }) => (
    <Mockstore>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const RecipientActivated: Story = {
  args: {
    user: {
      ...mockedUserData,
      _id: '12',
      name: 'Активированный Реципиент Евгеньевич',
      vkId: '12',
      role: UserRole.RECIPIENT,
      score: 2500,
      status: 3,
      keys: true,
    },
  },
  render: ({ ...args }) => (
    <Mockstore>
      <UserCard {...args} />
    </Mockstore>
  ),
};
