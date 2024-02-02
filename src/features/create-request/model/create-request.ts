import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { GeoCoordinates } from 'shared/types/point-geojson.types';

export type TInitialStateForPopup = {
  time: string;
  date: string;
  address: string;
  coordinates?: GeoCoordinates;
  categories: {
    id: number;
    name: string;
  }[];
  category: {
    value: string;
    label: string;
  };
  descriptionForTask: string;
  currentStep: number;
  termlessRequest: boolean;
  isPopupOpen: boolean;
  isTypeEdit: boolean;
};

export const InitialStateForPopup: TInitialStateForPopup = {
  time: '',
  date: format(new Date(), 'dd.MM.yyyy'),
  address: '',
  coordinates: [],
  categories: [],
  category: {
    value: '',
    label: '',
  },
  descriptionForTask: '',
  currentStep: 1,
  termlessRequest: false,
  isPopupOpen: false,
  isTypeEdit: false,
};

export const createRequestModel = createSlice({
  name: 'create-request',
  initialState: InitialStateForPopup,
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    clearTime(state, action) {
      state.time = '';
    },
    setAddress(state, action) {
      state.address = action.payload.additinalAddress;
      state.coordinates = action.payload.coords;
    },
    setCategoryList(state, action) {
      state.categories = action.payload;
    },
    setCategory(state, action) {
      state.category.value = action.payload.value;
      state.category.label = action.payload.label;
    },
    setDescriptionForTask(state, action) {
      state.descriptionForTask = action.payload;
    },
    changeCheckbox(state) {
      state.termlessRequest = !state.termlessRequest;
    },
    changeCurrentStep(state, action) {
      state.currentStep = action.payload;
      state.isTypeEdit = true;
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
      state.isTypeEdit = false;
      state.isPopupOpen = false;
      //очистить поле state
      state.descriptionForTask = '';
      state.date = format(new Date(), 'dd.MM.yyyy');
    },
  },
});

export const {
  setAddress,
  setDate,
  setDescriptionForTask,
  setTime,
  setCategoryList,
  setCategory,
  changeStepIncrement,
  changeStepDecrement,
  changeCheckbox,
  openPopup,
  closePopup,
  changeCurrentStep,
  clearTime,
} = createRequestModel.actions;
