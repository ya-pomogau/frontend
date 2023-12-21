import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserInfo } from '../types';
import { userLoginThunk } from '../../../services/system-slice';
import { UserRole } from 'shared/types/common.types';

type UserState = {
  id?: string;
  role: UserRole | null;
  data: UserInfo | null;
  isLoading: boolean;
  isFailed: boolean;
  error?: string | null | undefined;
};

const initialState: UserState = {
  role: null,
  data: null,
  isLoading: false,
  isFailed: false,
  error: null,
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
    enableBlokedError: (state) => {
      state.error = 'Пользователь заблокирован';
    },
    enableConnectionError: (state) => {
      state.error = 'Ошибка подключения';
    },
    enableAnyError: (state) => {
      state.error = 'Любой текст ошибки';
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        if (!action.payload) {
          return state;
        }
        const { user = null } = action.payload;
        if (!user) {
          return state;
        }
        const {
          _id,
          profile: { fullName, avatar, address, phone },
          location: { coordinates },
          permissions,
          role,
          isHasKeys,
          status,
          vkId,
          scores,
        } = user;
        const data: UserInfo = {
          fullname: fullName,
          avatar,
          address,
          phone,
          isHasKeys,
          status,
          role,
          vk: vkId,
          id: _id,
          coordinates,
          createdAt: 'a long long time ago in a far away galaxy...',
          scores,
          isActive: true,
          permissions,
        };
        return {
          ...state,
          isLoading: false,
          isFailed: false,
          error: null,
          role,
          data,
          id: _id,
        };
      })
      .addCase(userLoginThunk.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isFailed: true,
        error: action.payload as string,
      }))
      .addCase(userLoginThunk.pending, (state) => ({
        ...state,
        isLoading: true,
        isFailed: false,
        error: null,
      })),
});

export const {
  setUserRole,
  logoutUser,
  setUser,
  enableBlokedError,
  enableConnectionError,
  enableAnyError,
} = userModel.actions;
