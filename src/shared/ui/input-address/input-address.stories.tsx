import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createRequestModel } from 'features/create-request/model';
import { YMaps } from '@pbe/react-yandex-maps';
import { YMAPS_API_KEY } from 'config/ymaps/api-keys';

import { InputAddress } from '.';
import styles from './styles.module.css';

const Mockstore = ({ children }: { children: React.ReactNode }) => (
  <Provider
    store={configureStore({
      reducer: {
        user: createRequestModel.reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof InputAddress> = {
  title: 'uikit/FormElements/InputAddress',
  component: InputAddress,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
    customIcon: {
      type: 'string',
    },
  },
  decorators: [
    (Story) => (
      <Mockstore>
        <YMaps
          enterprise
          query={{
            load: 'Map,Placemark,map.addon.balloon,geoObject.addon.balloon',
            apikey: YMAPS_API_KEY,
          }}
        >
          <Story />
        </YMaps>
      </Mockstore>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'address',
    label: 'Адрес',
    placeholder: 'Введите адрес',
    error: false,
    errorText:
      'Не введен адрес. Пожалуйста, укажите адрес, по которому требуется помощь!',
    address: {
      address: '',
    },
    setAddress: () => {},
  },
};

export const Error: Story = {
  args: {
    name: 'address',
    label: 'Адрес',
    placeholder: 'Введите адрес',
    error: true,
    address: {
      address: '',
    },
    setAddress: () => {},
    errorText:
      'Не введен адрес. Пожалуйста, укажите адрес, по которому требуется помощь!',
  },
};

export const Width350px: Story = {
  args: {
    name: 'address',
    label: 'Адрес',
    placeholder: 'Введите адрес',
    error: false,
    address: {
      address: '',
    },
    setAddress: () => {},
    extClassName: styles.for_storybook,
  },
};
