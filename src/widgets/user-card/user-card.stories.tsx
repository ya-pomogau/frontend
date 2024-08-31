import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from '.';
import { AdminPermission, UserRole } from '../../shared/types/common.types';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const Mockstore = ({ initialState, children }: Record<any, any>) => (
  <Provider
    store={configureStore({
      reducer: {
        user: createSlice({
          name: 'user',
          initialState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const mockedVolunteerState = {
  role: UserRole.VOLUNTEER,
  data: null,
  isLoading: false,
  isFailed: false,
};

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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Admin: Story = {
  args: {
    user: {
      _id: '14',
      name: 'Админский Админ Админович',
      phone: '+7 (901) 123-45-67',
      avatar: 'https://thispersondoesnotexist.com',
      address: 'ул. Кораблестроителей, 19к1',
      vkId: '14',
      role: UserRole.ADMIN,
      status: 3,
      location: [59.942575, 30.216757],
      permissions: [AdminPermission.CONFIRMATION, AdminPermission.CONFLICTS],
    },
    viewMode: 'list',
  },
  render: ({ ...args }) => (
    <Mockstore initialState={mockedVolunteerState}>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const VolunteerBlocked: Story = {
  args: {
    user: {
      _id: '8',
      name: 'Заблокированный Волонтер Иванович',
      phone: '+1 (123) 456-7890',
      avatar: 'https://thispersondoesnotexist.com',
      address: 'ул. Кораблестроителей, 19к1',
      vkId: '123456789',
      role: UserRole.VOLUNTEER,
      score: 40,
      status: -1,
      location: [59.942575, 30.216757],
      keys: false,
    },
  },
  render: ({ ...args }) => (
    <Mockstore initialState={mockedVolunteerState}>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const VolunteerUnconfirmed: Story = {
  args: {
    user: {
      _id: '8',
      name: 'Неподтвержденный Волонтер Иванович',
      phone: '+1 (123) 456-7890',
      avatar: 'https://thispersondoesnotexist.com',
      address: 'ул. Кораблестроителей, 19к1',
      vkId: '123456789',
      role: UserRole.VOLUNTEER,
      score: 40,
      status: 0,
      location: [59.942575, 30.216757],
      keys: false,
    },
  },
  render: ({ ...args }) => (
    <Mockstore initialState={mockedVolunteerState}>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const VolunteerConfirmed: Story = {
  args: {
    user: {
      _id: '9',
      name: 'Проверенный Волонтер Бесключникович',
      phone: '+7 (901) 123-45-67',
      avatar: 'https://thispersondoesnotexist.com',
      address: 'ул. Кораблестроителей, 19к1',
      vkId: '9',
      role: UserRole.VOLUNTEER,
      score: 2500,
      status: 2,
      location: [59.942575, 30.216757],
      keys: false,
    },
  },
  render: ({ ...args }) => (
    <Mockstore initialState={mockedVolunteerState}>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const VolunteerVerifiedWithKeys: Story = {
  args: {
    user: {
      _id: '10',
      name: 'Проверенный Ключник Волонтерович',
      phone: '+7 (901) 123-45-67',
      avatar: 'https://thispersondoesnotexist.com',
      address: 'ул. Кораблестроителей, 19к1',
      vkId: '10',
      role: UserRole.VOLUNTEER,
      score: 2500,
      status: 2,
      location: [59.942575, 30.216757],
      keys: true,
    },
  },
  render: ({ ...args }) => (
    <Mockstore initialState={mockedVolunteerState}>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const VolunteerActivated: Story = {
  args: {
    user: {
      _id: '11',
      name: 'Активированный Ключник Волонтерович',
      phone: '+7 (901) 123-45-67',
      avatar: 'https://thispersondoesnotexist.com',
      address: 'ул. Кораблестроителей, 19к1',
      vkId: '11',
      role: UserRole.VOLUNTEER,
      score: 2500,
      status: 3,
      location: [59.942575, 30.216757],
      keys: true,
    },
  },
  render: ({ ...args }) => (
    <Mockstore initialState={mockedVolunteerState}>
      <UserCard {...args} />
    </Mockstore>
  ),
};

export const RecipientActivated: Story = {
  args: {
    user: {
      _id: '12',
      name: 'Активированный Реципиент Евгеньевич',
      phone: '+7 (901) 123-45-67',
      avatar: 'https://thispersondoesnotexist.com',
      address: 'ул. Кораблестроителей, 19к1',
      vkId: '12',
      role: UserRole.RECIPIENT,
      score: 2500,
      status: 3,
      location: [59.942575, 30.216757],
      keys: true,
    },
  },
  render: ({ ...args }) => (
    <Mockstore initialState={mockedVolunteerState}>
      <UserCard {...args} />
    </Mockstore>
  ),
};
