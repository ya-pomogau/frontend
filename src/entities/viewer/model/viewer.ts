import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMockData } from "../libs/get-mock-data";
import { IUserInfo, TRole } from "../types";

const initialState: { viewerInfo: IUserInfo } = {
  viewerInfo: getMockData(),
};

export const viewerModel = createSlice({
  name: "viewer",
  reducers: {
    updateUserRole: (state, { payload }: PayloadAction<TRole>) => {
      // eslint-disable-next-line no-param-reassign
      state.viewerInfo.role = payload;
    },
  },
  initialState,
});

export const { updateUserRole } = viewerModel.actions;
