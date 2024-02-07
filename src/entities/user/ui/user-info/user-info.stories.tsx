import { type Meta, type StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { UserInfo } from '.';
import { usersApi } from 'services/user-api';
import { UserRole } from 'shared/types/common.types';

const mockedMasterState = {
  role: UserRole.USER,
  data: {
    id: "1",
    name: "Админов Главный Админович",
    phone: "+7 (901) 123-44-55",
    avatar: "https://www.amica.it/wp-content/uploads/2020/07/mel-gibson-4.jpg",
    address: "ул. Поселковая, д. 5",
    vkId: "https://vk.com/id123456789",
    role: "GeneralUser",
    login: "root@mail.com",
    password: "459670778",
    isActive: true,
    isRoot: true,
    permissions: [
      "CONFIRM_USER",
      "CREATE_TASK",
      "GIVE_KEY",
      "RESOLVE_CONFLICT",
      "EDIT_BLOG",
      "SET_CATEGORY_POINTS"
      ]
  },
  isLoading: false,
  isFailed: false,
};

const mockedAdminState = {
  role: UserRole.ADMIN,
  data: {
    id: "2",
    name: "Админов Семен Семенович",
    phone: "+7 (902) 123-44-55",
    avatar: "https://w-dog.ru/wallpapers/4/16/424328707515423/mel-gibson-xrabroe-serdce-geroj-akter-muzhchina-lico-fon-voin-mel-gibson-chelovek-soldat-direktor.jpg",
    address: "ул. Стойкости, 17",
    vkId: "https://vk.com/id123456789",
    role: "Admin",
    login: "admin2@mail.com",
    password: "uoeft839",
    isActive: true,
    isRoot: false,
    permissions: [
      "GIVE_KEY",
      "RESOLVE_CONFLICT",
      "EDIT_BLOG",
      "SET_CATEGORY_POINTS"
    ]
  },
  isLoading: false,
  isFailed: false,
};

const mockedVolunteerState = {
  role: UserRole.VOLUNTEER,
  data: {
    id: "7",
    name: "Волонтеров Петр Петрович",
    phone: "+7 (901) 123-45-67",
    avatar: "https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg",
    address: "ул. Кораблестроителей, 19к1",
    vkId: "https://vk.com/id123456789",
    role: "Volunteer",
    score: 2500,
    status: 2,
    location: [
      59.942575,
      30.216757
    ],
    "keys": true
  },
  isLoading: false,
  isFailed: false,
};

const mockedRecipientState = {
  role: UserRole.RECIPIENT,
  data: {
    id: "4",
    name: "Реципиентов Алексей Борисович",
    phone: "+7 (916) 123-45-67",
    avatar: "https://tengu.ucoz.net/novosti/morio-higaonna.jpg",
    address: "ул. Нахимова, д. 9",
    vkId: "https://vk.com/id123456789",
    role: "Recipient",
    status: 1,
    location: [
      59.941871,
      30.223494
    ]
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
      reducer: usersApi.reducer,
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
