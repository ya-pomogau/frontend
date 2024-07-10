import type { Meta, StoryObj } from '@storybook/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { withRouter } from 'storybook-addon-remix-react-router';

import { SideMenu } from 'widgets/side-menu/components/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Icon } from 'shared/ui/icons';
import { VolunteerSideMenu } from 'widgets/side-menu/components/volunter-side-menu';
import { RecipientSideMenu } from 'widgets/side-menu/components/recipient-side-menu';
import { AdminSideMenu } from 'widgets/side-menu/components/admin-side-menu';
import { MasterSideMenu } from 'widgets/side-menu/components/master-side-menu';
import { FeedbackSideMenu } from './components/feedback-side-menu';
import { UserRole } from 'shared/types/common.types';

const mockedVolunteerState = {
  role: UserRole.VOLUNTEER,
  data: {
    id: '7',
    name: 'Волонтеров Петр Петрович',
    phone: '+7 (901) 123-45-67',
    avatar:
      'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
    address: 'ул. Кораблестроителей, 19к1',
    vkId: '123456789',
    role: UserRole.VOLUNTEER,
    score: 2500,
    status: 2,
    location: [59.942575, 30.216757],
    keys: true,
  },
  isLoading: false,
  isFailed: false,
};

const mockedRecipientState = {
  role: UserRole.RECIPIENT,
  data: {
    id: '4',
    name: 'Реципиентов Алексей Борисович',
    phone: '+7 (901) 123-45-67',
    avatar:
      'https://www.kinogallery.com/img/wallpaper/kinogallery-wallpaper-1600x1200-19242.jpg',
    address: 'ул. Нахимова, д. 9',
    vkId: '123456789',
    role: UserRole.RECIPIENT,
    status: 1,
    location: [59.942575, 30.216757],
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
    vkId: '123456789',
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
};

const mockedMasterState = {
  role: UserRole.ADMIN,
  data: {
    id: '1',
    name: 'Админов Главный Админович',
    phone: '+7 (901) 123-44-55',
    avatar: 'https://www.amica.it/wp-content/uploads/2020/07/mel-gibson-4.jpg',
    address: 'ул. Поселковая, д. 5',
    vkId: '123456789',
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
};

const mockedUnauthorizedState = {
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

const meta: Meta<typeof SideMenu> = {
  title: 'widgets/SideMenu',
  component: SideMenu,
  tags: ['autodocs'],
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SidemenuDefault: Story = {
  argTypes: {
    authRequired: {
      type: 'boolean',
      defaultValue: true,
      description:
        'Если true, авторизация нужна для отображения меню, и в сторе роль пользователя не null то меню отображается, иначе нет. Если false, меню всегда отображается вне зависимости от роли.',
      control: {
        type: 'boolean',
      },
    },
    links: {
      description:
        'Слот для элементов SideMenuLink. Оборачиваем в <></> и вставляем SideMenuLink.',
    },
  },
  render: ({ ...args }) => (
    <Mockstore initialState={mockedUnauthorizedState}>
      <SideMenu {...args} links={<></>} />
    </Mockstore>
  ),
};

export const SidemenuWithLinks: Story = {
  argTypes: {
    ...SidemenuDefault.argTypes,
  },
  args: {
    authRequired: false,
  },
  render: ({ ...args }) => (
    <Mockstore initialState={mockedUnauthorizedState}>
      <SideMenu
        {...args}
        links={
          <>
            <SideMenuLink
              to="/requests"
              text="Подтверждение / Блокировка"
              icon={<Icon color="white" icon="BlockIcon" size="54" />}
            />
            <SideMenuLink
              to="/statistics"
              text="Статистика"
              icon={<Icon color="white" icon="StatisticIcon" size="54" />}
            />

            <SideMenuLink
              to="/tasks"
              text="Создание / Редактирование заявки"
              icon={<Icon color="white" icon="CreateApplication" size="54" />}
            />
          </>
        }
      />
    </Mockstore>
  ),
};

export const VolunteerSideMenuExample: Story = {
  argTypes: {
    ...SidemenuDefault.argTypes,
  },
  args: {
    authRequired: true,
  },
  render: () => (
    <Mockstore initialState={mockedVolunteerState}>
      <VolunteerSideMenu />
    </Mockstore>
  ),
};

export const RecipientSideMenuExample: Story = {
  argTypes: {
    ...SidemenuDefault.argTypes,
  },
  args: {
    authRequired: true,
  },
  render: () => (
    <Mockstore initialState={mockedRecipientState}>
      <RecipientSideMenu />
    </Mockstore>
  ),
};

export const AdminSideMenuExample: Story = {
  argTypes: {
    ...SidemenuDefault.argTypes,
  },
  args: {
    authRequired: true,
  },
  render: () => (
    <Mockstore initialState={mockedAdminState}>
      <AdminSideMenu />
    </Mockstore>
  ),
};

export const MasterSideMenuExample: Story = {
  argTypes: {
    ...SidemenuDefault.argTypes,
  },
  args: {
    authRequired: true,
  },
  render: () => (
    <Mockstore initialState={mockedMasterState}>
      <MasterSideMenu />
    </Mockstore>
  ),
};

export const FeedbackSideMenuExample: Story = {
  argTypes: {
    ...SidemenuDefault.argTypes,
  },
  args: {
    authRequired: false,
  },
  render: () => (
    <Mockstore initialState={mockedMasterState}>
      <FeedbackSideMenu />
    </Mockstore>
  ),
};
