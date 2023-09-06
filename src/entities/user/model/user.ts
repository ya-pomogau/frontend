import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserInfo, UserRole } from '../types';

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

export const userModel = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, { payload }: PayloadAction<UserRole | null>) => {
      state.role = payload;
    },
    logoutUser: (state) => {
      state.data = null;
      state.role = null;
    },
    setUser: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { setUserRole, logoutUser, setUser } = userModel.actions;
