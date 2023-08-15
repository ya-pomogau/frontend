import type { Meta, StoryObj } from '@storybook/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { withRouter } from 'storybook-addon-react-router-v6';

import {
  MapTasksFilter,
  ActiveTasksFilter,
  CompletedTasksFilter,
  AdminsTasksFilter,
  RequestsFilter,
} from 'features/filter';

/*
 * Информация о фильтре: https://github.com/vierim/YaPomogayu-frontend/issues/82#issuecomment-1678997474
 */

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

const meta: Meta<typeof MapTasksFilter> = {
  title: 'features/Filter',
  component: MapTasksFilter,
  decorators: [withRouter],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const VolunteerMapTasksFilter: Story = {
  render: () => (
    <Mockstore initialState={mockedVolunteerState}>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <MapTasksFilter />
      </div>
    </Mockstore>
  ),
};

export const VolunteerActiveTasksFilterFilter: Story = {
  render: () => (
    <Mockstore initialState={mockedVolunteerState}>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ActiveTasksFilter />
      </div>
    </Mockstore>
  ),
};

export const RecipientActiveTasksFilterFilter: Story = {
  render: () => (
    <Mockstore initialState={mockedRecipientState}>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ActiveTasksFilter />
      </div>
    </Mockstore>
  ),
};

export const VolunteerCompletedTasksFilter: Story = {
  render: () => (
    <Mockstore initialState={mockedVolunteerState}>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CompletedTasksFilter />
      </div>
    </Mockstore>
  ),
};

export const RecipientCompletedTasksFilter: Story = {
  render: () => (
    <Mockstore initialState={mockedRecipientState}>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CompletedTasksFilter />
      </div>
    </Mockstore>
  ),
};

export const AdminRequestsFilter: Story = {
  render: () => (
    <Mockstore initialState={mockedAdminState}>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RequestsFilter />
      </div>
    </Mockstore>
  ),
};

export const AdminTasksFilter: Story = {
  render: () => (
    <Mockstore initialState={mockedAdminState}>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AdminsTasksFilter />
      </div>
    </Mockstore>
  ),
};
