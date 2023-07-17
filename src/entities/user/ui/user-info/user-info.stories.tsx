import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { UserInfo } from '.';

const mockedMasterState = {
  role: 'master',
  data: {
    id: 1,
    fullname: 'Админов Главный Админович',
    role: 'master',
    vk: 'https://vk.com/id123456789',
    avatar: 'https://www.amica.it/wp-content/uploads/2020/07/mel-gibson-4.jpg',
    phone: '+7 (901) 123-44-55',
    address: 'ул. Поселковая, д. 5',
    coordinates: [59.821539, 30.178031],
    approved: null,
    checked: null,
    keys: null,
    adminStatus: 5,
    scores: null,
  },
  isLoading: false,
  isFailed: false,
};

const mockedAdminState = {
  role: 'admin',
  data: {
    id: 2,
    fullname: 'Админов Семен Семенович',
    role: 'admin',
    vk: 'https://vk.com/id123456789',
    avatar:
      'https://w-dog.ru/wallpapers/4/16/424328707515423/mel-gibson-xrabroe-serdce-geroj-akter-muzhchina-lico-fon-voin-mel-gibson-chelovek-soldat-direktor.jpg',
    phone: '+7 (902) 123-44-55',
    address: 'ул. Стойкости, 17',
    coordinates: [59.828347, 30.21187],
    approved: null,
    checked: null,
    keys: null,
    adminStatus: 2,
    scores: null,
  },
  isLoading: false,
  isFailed: false,
};

const mockedVolunteerState = {
  role: 'volunteer',
  data: {
    id: 7,
    fullname: 'Волонтеров Петр Петрович',
    role: 'volunteer',
    vk: 'https://vk.com/id123456789',
    avatar:
      'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
    phone: '+7 (901) 123-45-67',
    address: 'ул. Кораблестроителей, 19к1',
    coordinates: [59.942575, 30.216757],
    approved: true,
    checked: true,
    keys: true,
    scores: 2500,
  },
  isLoading: false,
  isFailed: false,
};

const mockedRecipientState = {
  role: 'recipient',
  data: {
    id: 4,
    fullname: 'Реципиентов Алексей Борисович',
    role: 'recipient',
    vk: 'https://vk.com/id123456789',
    avatar: 'https://tengu.ucoz.net/novosti/morio-higaonna.jpg',
    phone: '+7 (916) 123-45-67',
    address: 'ул. Нахимова, д. 9',
    coordinates: [59.941871, 30.223494],
    approved: true,
  },
  isLoading: false,
  isFailed: false,
};

const unauthorizedState = {
  role: null,
  data: null,
  isLoading: false,
  isFailed: false,
};

const Mockstore = ({ initialState, children }: Record<any, any>) => (
  <Provider
    store={configureStore({
      reducer: {
        user: createSlice({
          name: 'tasks',
          initialState,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof UserInfo> = {
  title: 'Entities/UserInfo',
  component: UserInfo,
  tags: ['autodocs'],
  decorators: [withRouter],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Volunteer: Story = {
  decorators: [
    (story) => (
      <Mockstore initialState={mockedVolunteerState}>{story()}</Mockstore>
    ),
  ],
};

export const Recipient: Story = {
  decorators: [
    (story) => (
      <Mockstore initialState={mockedRecipientState}>{story()}</Mockstore>
    ),
  ],
};

export const Admin: Story = {
  decorators: [
    (story) => <Mockstore initialState={mockedAdminState}>{story()}</Mockstore>,
  ],
};

export const Master: Story = {
  decorators: [
    (story) => (
      <Mockstore initialState={mockedMasterState}>{story()}</Mockstore>
    ),
  ],
};

export const Unauthorized: Story = {
  decorators: [
    (story) => (
      <Mockstore initialState={unauthorizedState}>{story()}</Mockstore>
    ),
  ],
};
