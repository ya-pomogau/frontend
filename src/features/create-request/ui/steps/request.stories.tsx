import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  TInitialStateForPopup,
  createRequestModel,
} from 'features/create-request/model';
import { format } from 'date-fns';
import { YMAPS_API_KEY } from 'config/ymaps/api-keys';

import { YMaps } from '@pbe/react-yandex-maps';

import { Request } from '.';

export const InitialStateForPopup: TInitialStateForPopup = {
  taskId: '',
  time: '',
  date: format(new Date(), 'dd.MM.yyyy'),
  address: '',
  location: [],
  categories: [],
  category: {
    _id: '',
    title: '',
  },
  description: '',
  currentStep: 1,
  termlessRequest: false,
  isPopupOpen: false,
  isTypeEdit: false,
  temporaryAddress: '',
  temporaryCoordinates: [],
  temporaryCategory: {
    _id: '',
    title: '',
  },
  temporaryDescriptionForTask: '',
  temporaryTime: format(new Date(), 'hh:mm'),
  temporaryDate: format(new Date(), 'dd.MM.yyyy'),
};

// eslint-disable-next-line react/prop-types
const Mockstore = ({ children }: Record<any, any>) => (
  <Provider
    store={configureStore({
      reducer: {
        createRequest: createRequestModel.reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta: Meta<typeof Request> = {
  title: 'Features/Request',
  component: Request,
  tags: ['autodocs'],
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

export const Desktop: Story = {
  args: {
    isMobile: false,
  },
};
