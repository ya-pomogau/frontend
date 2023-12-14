import { type Meta, type StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { UserInfo } from '.';
import { usersApi } from 'services/user-api';

const mockedMasterState = {
  role: 'master',
  data: {
    id: 1,
    createdAt: '2023-07-09T17:30Z',
    fullname: 'Админов Главный Админович',
    role: 'master',
    vk: 'https://vk.com/id123456789',
    avatar: 'https://www.amica.it/wp-content/uploads/2020/07/mel-gibson-4.jpg',
    phone: '+7 (901) 123-44-55',
    address: 'ул. Поселковая, д. 5',
    coordinates: [59.821539, 30.178031],
    status: 'activated',
    isHasKeys: true,
    permissions: [
      { id: 0, name: 'read' },
      { id: 1, name: 'profiles approval' },
      { id: 2, name: 'create tasks' },
      { id: 3, name: 'set keys' },
      { id: 4, name: 'resolve conflicts' },
      { id: 5, name: 'blog' },
      { id: 7, name: 'increase score' },
    ],
    scores: null,
    isActive: true,
  },
  isLoading: false,
  isFailed: false,
};

const mockedAdminState = {
  role: 'admin',
  data: {
    id: 2,
    createdAt: '2023-07-09T17:30Z',
    fullname: 'Админов Семен Семенович',
    role: 'admin',
    vk: 'https://vk.com/id123456789',
    avatar:
      'https://w-dog.ru/wallpapers/4/16/424328707515423/mel-gibson-xrabroe-serdce-geroj-akter-muzhchina-lico-fon-voin-mel-gibson-chelovek-soldat-direktor.jpg',
    phone: '+7 (902) 123-44-55',
    address: 'ул. Стойкости, 17',
    coordinates: [59.828347, 30.21187],
    status: 'activated',
    permissions: [
      { id: 0, name: 'read' },
      { id: 1, name: 'profiles approval' },
      { id: 2, name: 'create tasks' },
    ],
    isHasKeys: false,
    scores: null,
    isActive: true,
  },
  isLoading: false,
  isFailed: false,
};

const mockedVolunteerState = {
  role: 'volunteer',
  data: {
    id: 7,
    createdAt: '2023-07-09T17:30Z',
    fullname: 'Волонтеров Петр Петрович',
    role: 'volunteer',
    vk: 'https://vk.com/id123456789',
    avatar:
      'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
    phone: '+7 (901) 123-45-67',
    address: 'ул. Кораблестроителей, 19к1',
    coordinates: [59.942575, 30.216757],
    status: 'verified',
    isHasKeys: true,
    scores: 2500,
    isActive: true,
  },
  isLoading: false,
  isFailed: false,
};

const mockedRecipientState = {
  role: 'recipient',
  data: {
    id: 4,
    createdAt: '2023-07-09T17:30Z',
    fullname: 'Реципиентов Алексей Борисович',
    role: 'recipient',
    vk: 'https://vk.com/id123456789',
    avatar: 'https://tengu.ucoz.net/novosti/morio-higaonna.jpg',
    phone: '+7 (916) 123-45-67',
    address: 'ул. Нахимова, д. 9',
    coordinates: [59.941871, 30.223494],
    status: 'confirmed',
    isActive: true,
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
      reducer: usersApi.reducer
      // reducer: {
      //   user: createSlice({
      //     name: 'user',
      //     initialState,
      //     reducers: {},
      //   }).reducer,
      // },
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
