import type { Meta, StoryObj } from '@storybook/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { withRouter } from 'storybook-addon-react-router-v6';

import { SideMenu } from 'widgets/side-menu/components/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';
import { Icon } from 'shared/ui/icons';
import { VolunteerSideMenu } from 'widgets/side-menu/components/volunter-side-menu';
import { RecipientSideMenu } from 'widgets/side-menu/components/recipient-side-menu';
import { AdminSideMenu } from 'widgets/side-menu/components/admin-side-menu';
import { MasterSideMenu } from 'widgets/side-menu/components/master-side-menu';
import { FeedbackSideMenu } from './components/feedback-side-menu';

const mockedVolunteerState = {
  role: 'volunteer',
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

const mockedRecipientState = {
  ...mockedVolunteerState,
  role: 'recipient',
};

const mockedAdminState = {
  ...mockedVolunteerState,
  role: 'admin',
};

const mockedMasterState = {
  ...mockedVolunteerState,
  role: 'master',
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
  render: ({ ...args }) => (
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
  render: ({ ...args }) => (
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
  render: ({ ...args }) => (
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
  render: ({ ...args }) => (
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
  render: ({ ...args }) => (
    <Mockstore initialState={mockedMasterState}>
      <FeedbackSideMenu />
    </Mockstore>
  ),
};
