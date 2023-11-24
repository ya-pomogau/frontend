import type { Meta, StoryObj } from '@storybook/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { withRouter } from 'storybook-addon-react-router-v6';

import type {
  FilterProps,
  NotFoundFilterProps,
  FilteringProps,
} from 'features/filter/filter';
import { Filter } from 'features/filter';

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

const meta: Meta<typeof Filter> = {
  title: 'features/Filter',
  component: Filter,
  tags: ['autodocs'],
  decorators: [withRouter],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultFilter: Story & any = {
  args: {
    items: {
      categories: true,
      radius: true,
      sort: true,
      date: true,
      time: true,
    },
  },
  render: ({ ...args }: FilteringProps) => (
    <Mockstore initialState={mockedVolunteerState}>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Filter {...args} />
      </div>
    </Mockstore>
  ),
};

export const BlockedFilter: Story & any = {
  args: {
    notFoundFilter: true,
  },
  render: ({ ...args }: NotFoundFilterProps) => (
    <Mockstore initialState={mockedVolunteerState}>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Filter {...args} />
      </div>
    </Mockstore>
  ),
};
