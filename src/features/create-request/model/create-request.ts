import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { Category } from 'entities/task/types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';

export type TInitialStateForPopup = {
  time: string;
  date: string;
  address: string;
  location?: GeoCoordinates;
  categories: Category[];
  category: {
    id: string;
    title: string;
  };
  description: string;
  currentStep: number;
  termlessRequest: boolean;
  isPopupOpen: boolean;
  isTypeEdit: boolean;
  temporaryAddress: string;
  temporaryCoordinates?: GeoCoordinates;
  temporaryCategory: {
    id: string;
    title: string;
  };
  temporaryDescriptionForTask: string;
};

export const InitialStateForPopup: TInitialStateForPopup = {
  time: format(new Date(), 'hh:mm'),
  date: format(new Date(), 'dd.MM.yyyy'),
  address: '',
  location: [],
  categories: [],
  category: {
    id: '',
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
    id: '',
    title: '',
  },
  temporaryDescriptionForTask: '',
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
    setAddress(state, action) {
      state.address = action.payload.additinalAddress;
      state.location = action.payload.coords;
    },
    setCategoryList(state, action) {
      state.categories = action.payload;
    },
    setCategory(state, action) {
      state.category.id = action.payload.id;
      state.category.title = action.payload.title;
    },
    setDescriptionForTask(state, action) {
      state.description = action.payload;
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
    },
    clearState(state) {
      Object.assign(state, InitialStateForPopup);
    },
    setTemporary(state, action) {
      state.temporaryAddress = action.payload.initialData.address;
      //state.temporaryCoordinates = action.payload.initialData.coords;
      state.temporaryCategory.id = action.payload.initialData.category.id;
      state.temporaryCategory.title = action.payload.initialData.category.title;
      state.temporaryDescriptionForTask =
        action.payload.initialData.description;
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
  clearState,
  changeCurrentStep,
  setTemporary,
} = createRequestModel.actions;
