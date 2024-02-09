import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from '.';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Loader } from '../loader';
import { UserRole } from 'shared/types/common.types';

const mockedRecipientState = {
  role: UserRole.RECIPIENT,
  data: {
    id: '4',
    name: 'Реципиентов Алексей Борисович',
    phone: '+7 (901) 123-45-67',
    avatar:
      'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
    address: 'ул. Нахимова, д. 9',
    vkId: 'https://vk.com/id123456789',
    role: UserRole.RECIPIENT,
    status: 1,
    location: [59.942575, 30.216757],
  },
  isLoading: false,
  isFailed: false,
};

const mockedMasterState = {
  role: UserRole.ADMIN,
  data: {
    id: '1',
    name: 'Админов Главный Админович',
    phone: '+7 (901) 123-44-55',
    avatar: 'https://www.amica.it/wp-content/uploads/2020/07/mel-gibson-4.jpg',
    address: 'ул. Поселковая, д. 5',
    vkId: 'https://vk.com/id123456789',
    role: UserRole.ADMIN,
    login: 'root@mail.com',
    password: '459670778',
    isActive: true,
    isRoot: true,
    permissions: [
      'CONFIRM_USER',
      'CREATE_TASK',
      'GIVE_KEY',
      'RESOLVE_CONFLICT',
      'EDIT_BLOG',
      'SET_CATEGORY_POINTS',
    ],
  },
  isLoading: false,
  isFailed: false,
};

const mockedAdminState = {
  role: UserRole.ADMIN,
  data: {
    id: '2',
    name: 'Админов Семен Семенович',
    phone: '+7 (902) 123-44-55',
    avatar:
      'https://w-dog.ru/wallpapers/4/16/424328707515423/mel-gibson-xrabroe-serdce-geroj-akter-muzhchina-lico-fon-voin-mel-gibson-chelovek-soldat-direktor.jpg',
    address: 'ул. Стойкости, 17',
    vkId: 'https://vk.com/id123456789',
    role: UserRole.ADMIN,
    login: 'admin2@mail.com',
    password: 'uoeft839',
    isActive: true,
    isRoot: false,
    permissions: [
      'GIVE_KEY',
      'RESOLVE_CONFLICT',
      'EDIT_BLOG',
      'SET_CATEGORY_POINTS',
    ],
  },
  isLoading: false,
  isFailed: false,
};

const mockedVolunteerState = {
  role: UserRole.VOLUNTEER,
  data: {
    id: '7',
    name: 'Волонтеров Петр Петрович',
    phone: '+7 (901) 123-45-67',
    avatar:
      'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
    address: 'ул. Кораблестроителей, 19к1',
    vkId: 'https://vk.com/id123456789',
    role: UserRole.VOLUNTEER,
    score: 2500,
    status: 2,
    location: [59.942575, 30.216757],
    keys: true,
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
