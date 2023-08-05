import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../shared/api';
import type { UpdateUserInfo, UserInfo, UserRole } from '../types';

type UserState = {
  id?: number;
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

export const updateUserInfo = createAsyncThunk<UserInfo | [], UpdateUserInfo>(
  'user/updateUser',
  async function (body) {
    const response = await api.updateUser(body);
    return response;
  }
);

export const uploadUserAvatar = createAsyncThunk<UserInfo | [], FormData>(
  'user/uploadUserAvatar',
  async function (body: FormData) {
    const response = await api.uploadAvatar(body);
    return response;
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
      .addCase(fetchUserDataByRole.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchUserDataByRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.error.message;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.error.message;
      })
      .addCase(uploadUserAvatar.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(uploadUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
      })
      .addCase(uploadUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.error.message;
      });
  },
});

export const { setUserRole } = userModel.actions;
