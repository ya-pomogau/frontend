import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { api } from '../../../shared/api';

export type TInitialStateForPopup = {
  time: string;
  date: string;
  address: string;
  coordinates: [number, number] | undefined;
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
};

export const fetchCategories = createAsyncThunk(
  'create-request/fetchCategory',
  async () => {
    const data = await api.getAllCategories();
    return data;
  }
);

export const InitialStateForPopup: TInitialStateForPopup = {
  time: '',
  date: format(new Date(), 'dd.MM.yyyy'),
  address: '',
  coordinates: undefined,
  categories: [],
  category: {
    value: '',
    label: '',
  },
  descriptionForTask: '',
  currentStep: 1,
  termlessRequest: false,
  isPopupOpen: false,
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
      state.coordinates = action.payload.coords;
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
      state.isPopupOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {
  setAddress,
  setDate,
  setDescriptionForTask,
  setTime,
  setCategory,
  changeStepIncrement,
  changeStepDecrement,
  changeCheckbox,
  openPopup,
  closePopup,
} = createRequestModel.actions;
