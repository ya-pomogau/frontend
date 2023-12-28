import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from '.';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Loader } from '../loader';

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
    status: 'confirmed',
  },
  isLoading: false,
  isFailed: false,
};

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
  },
  isLoading: false,
  isFailed: false,
};

const mockedTasksState = {
  isLoading: false,
};

const mockedTasksLoadingState = {
  isLoading: false,
};

const mockedUnauthorizedState = {
  role: null,
  data: null,
  isLoading: false,
  isFailed: false,
};

const Mockstore = ({
  initialState,
  initialTasks,
  children,
}: Record<any, any>) => (
  <Provider
    store={configureStore({
      reducer: {
        user: createSlice({
          name: 'user',
          initialState,
          reducers: {},
        }).reducer,
        tasks: createSlice({
          name: 'tasks',
          initialState: initialTasks,
          reducers: {},
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof PageLayout> = {
  title: 'widgets/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],

  argTypes: {
    content: {
      description:
        'Компонент PageLayout внутри которого отображается переход к содержимому других компонентов на страницах приложения',
    },
  },
  decorators: [withRouter],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Unauthorized: Story = {
  decorators: [
    (story) => (
      <Mockstore
        initialState={mockedUnauthorizedState}
        initialTasks={mockedTasksState}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const RecipientPage: Story = {
  decorators: [
    (story) => (
      <Mockstore
        initialState={mockedRecipientState}
        initialTasks={mockedTasksState}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const VolunteerPage: Story = {
  decorators: [
    (story) => (
      <Mockstore
        initialState={mockedVolunteerState}
        initialTasks={mockedTasksState}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const AdminPage: Story = {
  decorators: [
    (story) => (
      <Mockstore
        initialState={mockedAdminState}
        initialTasks={mockedTasksState}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const MasterAdminPage: Story = {
  decorators: [
    (story) => (
      <Mockstore
        initialState={mockedMasterState}
        initialTasks={mockedTasksState}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
