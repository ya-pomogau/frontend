import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import { InfoContainer } from '.';

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
    status: 'verified',
    keys: 1,
    scores: 2500,
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

const meta: Meta<typeof InfoContainer> = {
  title: 'uikit/InfoContainer',
  component: InfoContainer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatar: mockedVolunteerState.data.avatar,
  },
  decorators: [
    (story) => (
      <Mockstore initialState={mockedVolunteerState}>{story()}</Mockstore>
    ),
  ],
};

export const WithoutAvatar: Story = {
  decorators: [
    (story) => (
      <Mockstore initialState={mockedVolunteerState}>{story()}</Mockstore>
    ),
  ],
};
