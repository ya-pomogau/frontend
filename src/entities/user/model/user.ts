import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  newUserThunk,
  userLoginThunk,
  adminLoginThunk,
} from '../../../services/system-slice';
import { UserRole, UserStatus } from 'shared/types/common.types';
import { User } from '../types';
import { TCustomSelector } from 'shared/types/store.types';

type UserState = {
  _id: string;
  role: UserRole | null;
  data: User | null;
  isLoading: boolean;
  isFailed: boolean;
  error?: string | null | undefined;
};

const initialState: UserState = {
  _id: '',
  role: null,
  data: null,
  isLoading: false,
  isFailed: false,
  error: null,
};
export const isRootSelector: TCustomSelector<boolean> = (state) =>
  !!state.user && (state.user.data?.isRoot ?? false);
export const isUnConfirmedSelector: TCustomSelector<boolean> = (state) =>
  state.user.data?.status === UserStatus.UNCONFIRMED;
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
    setUser: (state, { payload }: PayloadAction<User>) => {
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
          name,
          phone,
          avatar,
          address,
          location,
          role,
          keys,
          status,
          vkId,
          score,
        } = user;
        const data: User = {
          _id,
          name,
          phone,
          avatar,
          address,
          location: location?.coordinates,
          role,
          keys,
          status,
          vkId,
          score,
        };
        return {
          ...state,
          isLoading: false,
          isFailed: false,
          error: null,
          role,
          data,
          _id,
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
      }))
      .addCase(newUserThunk.fulfilled, (state, action) => {
        if (!action.payload) {
          return state;
        }
        const { user = null } = action.payload;
        if (!user) {
          return state;
        }
        const {
          _id,
          name,
          phone,
          avatar,
          address,
          location,
          role,
          keys,
          status,
          vkId,
          score,
        } = user;
        const data: User = {
          _id,
          name,
          phone,
          avatar,
          address,
          location: location?.coordinates,
          role,
          keys,
          status,
          vkId,
          score,
        };
        return {
          ...state,
          isLoading: false,
          isFailed: false,
          error: null,
          role,
          data,
          _id,
        };
      })
      .addCase(newUserThunk.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isFailed: true,
        error: action.payload as string,
      }))
      .addCase(newUserThunk.pending, (state) => ({
        ...state,
        isLoading: true,
        isFailed: false,
        error: null,
      }))
      .addCase(adminLoginThunk.pending, (state) => ({
        ...state,
        isLoading: true,
        isFailed: false,
        error: null,
      }))
      .addCase(adminLoginThunk.fulfilled, (state, action) => {
        if (!action.payload) {
          return state;
        }
        const { user = null } = action.payload;
        if (!user) {
          return state;
        }
        const {
          _id,
          name,
          phone,
          avatar,
          address,
          role,
          vkId,
          password,
          login,
          permissions,
          isRoot,
          isActive,
        } = user;
        const data: User = {
          _id,
          name,
          phone,
          avatar,
          address,
          role,
          vkId,
          password,
          login,
          permissions,
          isRoot,
          isActive,
        };
        return {
          ...state,
          isLoading: false,
          isFailed: false,
          error: null,
          role,
          data,
          _id,
        };
      })
      .addCase(adminLoginThunk.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.payload as string,
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
