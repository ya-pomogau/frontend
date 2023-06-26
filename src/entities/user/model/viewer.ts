import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { api } from "shared/api";
import type { TUserInfo, TUserRole } from "../types";

type TUserState = {
  role: TUserRole | null;
  data: TUserInfo | null;
  isLoading: boolean;
  isFailed: boolean;
}

const initialState: TUserState = {
  role: null,
  data: null,
  isLoading: false,
  isFailed: false,
};

export const fetchUserData = createAsyncThunk(
  'user/fetchData',
  async () => {
    const response = await api.getAllUsers();
    return response[7];
  }
);

export const userModel = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRole: (state, { payload }: PayloadAction<TUserRole>) => {
      state.role = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.data = action.payload;
    })
  },
});

export const { setUserRole } = userModel.actions;
