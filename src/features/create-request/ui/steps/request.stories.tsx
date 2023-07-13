import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TInitialStateForPopup } from "features/create-request/model";
import moment from "moment";
import { YMaps } from "@pbe/react-yandex-maps";

import { Request } from ".";

const InitialStateForPopup: TInitialStateForPopup = {
  name: "Иванов Иван Иванович",
  avatarLink: "https://i.pravatar.cc/300",
  phoneNumber: "+7(000) 000-00-00",
  time: "00:00",
  date: moment().format("DD.MM.YYYY"),
  address: "",
  coordinates: undefined,
  typeOfTask: "",
  descriptionForTask: "",
  currentStep: 1,
  termlessRequest: false,
  isPopupOpen: true,
};

const createRequestModel = createSlice({
  name: "create-request",
  initialState: InitialStateForPopup,
  reducers: {
    addDate(state, action) {
      state.date = action.payload;
    },
    addTime(state, action) {
      state.time = action.payload;
    },
    addAddress(state, action) {
      state.address = action.payload.additinalAddress;
      state.coordinates = action.payload.coords;
    },
    addTypeOfTask(state, action) {
      state.typeOfTask = action.payload;
    },
    addDescriptionForTask(state, action) {
      state.descriptionForTask = action.payload;
    },
    changeCheckbox(state) {
      state.termlessRequest = !state.termlessRequest;
    },
    changeStepIncrement(state) {
      const increment = (prev: number) => prev + 1;
      state.currentStep = increment(state.currentStep);
    },
    changeStepDecrement(state) {
      const decrement = (prev: number) => prev - 1;
      state.currentStep = decrement(state.currentStep);
    },
    openPopup(state) {
      state.isPopupOpen = true;
    },
    closePopup(state) {
      state.currentStep = InitialStateForPopup.currentStep;
      // state.address = InitialStateForPopup.address;
      // state.date = InitialStateForPopup.date;
      // state.descriptionForTask = InitialStateForPopup.descriptionForTask;
      // state.termlessRequest = InitialStateForPopup.termlessRequest;
      // state.time = InitialStateForPopup.time;
      // state.typeOfTask = InitialStateForPopup.typeOfTask;
      state.isPopupOpen = false;
    },
  },
});

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
  title: "Entities/Request",
  component: Request,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Mockstore>
        <YMaps
          enterprise
          query={{
            load: "Map,Placemark,map.addon.balloon,geoObject.addon.balloon",
            apikey: "0cdc3c9a-36a5-482d-8090-9c74d8d5f92e",
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
    tasks: [{ value: "Выгулять собаку", label: "Выгулять собаку" }],
    isMobile: false,
  },
};

