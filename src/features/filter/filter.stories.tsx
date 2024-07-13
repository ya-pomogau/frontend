import type { Meta, StoryObj } from '@storybook/react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { withRouter } from 'storybook-addon-remix-react-router';

import type { FilteringProps, NotFoundFilterProps } from './types';
import { Filter } from 'features/filter';
import { UserRole } from 'shared/types/common.types';

const mockedVolunteerState = {
  role: UserRole.VOLUNTEER,
  data: {
    id: '8',
    name: 'Волонтеров Иван Иванович',
    phone: '+7 (901) 123-00-00',
    avatar:
      'https://w-dog.ru/wallpapers/5/9/423831500799983/koshachij-lemur-obezyana-priroda.jpg',
    address: 'ул. Строителей, 15',
    vkId: 'https://vk.com/id123456788',
    role: UserRole.VOLUNTEER,
    score: 0,
    status: 1,
    location: [55.686985, 37.529654],
    keys: false,
  },
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
      sort: false,
      categories: true,
      radius: true,
      time: true,
      date: true,
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

export const FilterTasksVolunteers: Story & any = {
  args: {
    items: {
      sort: true,
      categories: true,
      radius: false,
      time: false,
      date: false,
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

export const FilterTasksRecipien: Story & any = {
  args: {
    items: {
      sort: true,
      categories: true,
      radius: false,
      time: false,
      date: false,
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
