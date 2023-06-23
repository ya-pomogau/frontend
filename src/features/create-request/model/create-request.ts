import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export type TInitialStateForPopup = {
  name: string;
  avatarLink: string;
  phoneNumber: string;
  time: string;
  date: string;
  address: string;
  typeOfTask: string;
  descriptionForTask: string;
  currentStep: number;
  termlessRequest: boolean;
  isPopupOpen: boolean;
};

export const InitialStateForPopup: TInitialStateForPopup = {
  name: "Иванов Иван Иванович",
  avatarLink: "https://i.pravatar.cc/300",
  phoneNumber: "+7(000) 000-00-00",
  time: "00:00",
  date: moment().format("DD.MM.YYYY"),
  address: "",
  typeOfTask: "",
  descriptionForTask: "",
  currentStep: 1,
  termlessRequest: false,
  isPopupOpen: false,
};

export const createRequestModel = createSlice({
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
      state.address = action.payload;
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
      state.address = InitialStateForPopup.address;
      state.date = InitialStateForPopup.date;
      state.descriptionForTask = InitialStateForPopup.descriptionForTask;
      state.termlessRequest = InitialStateForPopup.termlessRequest;
      state.time = InitialStateForPopup.time;
      state.typeOfTask = InitialStateForPopup.typeOfTask;
      state.isPopupOpen = false;
    },
  },
});

export const {
  addAddress,
  addDate,
  addDescriptionForTask,
  addTime,
  addTypeOfTask,
  changeStepIncrement,
  changeStepDecrement,
  changeCheckbox,
  openPopup,
  closePopup,
} = createRequestModel.actions;
