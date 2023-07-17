import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../shared/api';
import type { UserInfo, UserRole } from '../types';

type UserState = {
  role: UserRole | null;
  data: UserInfo | null;
  isLoading: boolean;
  isFailed: boolean;
  error?: string;
};

const initialState: UserState = {
  role: null,
  data: null,
  isLoading: false,
  isFailed: false,
};

export const fetchUserDataByRole = createAsyncThunk(
  'user/fetchData',
  async (role: UserRole) => {
    const response = await api.getAllUsers();
    return response.filter((user) => user.role === role)[0];
  }
);

export const userModel = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, { payload }: PayloadAction<UserRole>) => {
      state.role = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataByRole.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(fetchUserDataByRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserDataByRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.error.message;
      });
  },
});

export const { setUserRole } = userModel.actions;
