import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../app/store';
import {
  ErrorDto,
  TAdminLoginDto,
  TNewUserRequestDto,
  TVKLoginRequestDto,
} from './auth.types';
import {
  SocketConnectionStatus,
  TCustomSelector,
  TSystemSliceState,
} from '../shared/types/store.types';
import { AdminPermission } from '../shared/types/common.types';
import { TUser, TVKUser } from '../entities/user/types';
import { setTokenAccess } from '../shared/libs/utils';
import { authApi } from './auth';

export const isPendingSelector: TCustomSelector<boolean> = (state: RootState) =>
  state.system.isPending;

export const isNewSelector: TCustomSelector<boolean> = (state: RootState) =>
  state.system.isNew;

export const userSelector: TCustomSelector<TUser | null> = (state) =>
  state.system.user;

export const vkUserSelector: TCustomSelector<TVKUser | null> = (state) =>
  state.system.vkUser;

export const hasPrivilegesSelector: TCustomSelector<boolean> = (state) =>
  !!state.system.user &&
  !!state.system.user.permissions &&
  state.system.user.permissions.length > 0;

export const isRootSelector: TCustomSelector<boolean> = (state) =>
  !!state.system.user && (state.system.user.isRoot ?? false);

export const permissionsSelector: TCustomSelector<
  Array<AdminPermission> | null
> = (state) =>
  !!state.system.user &&
  !!state.system.user.permissions &&
  state.system.user.permissions.length > 0
    ? state.system.user.permissions
    : null;

export const userLoginThunk = createAsyncThunk(
  'user/login',
  async (userLoginDto: TVKLoginRequestDto, { rejectWithValue }) => {
    try {
      const tmpRes = await authApi.vkLogin(userLoginDto);
      const { token, user, vkUser: vkUserResponse } = tmpRes;
      const vkUser = vkUserResponse ? vkUserResponse : null;

      if (token && !!user) {
        setTokenAccess(token);
      }
      return { user, vkUser };
    } catch (error) {
      const { message } = error as ErrorDto;
      console.log(`Error message: ${message}`);
      rejectWithValue(message as string);
    }
  }
);

export const adminLoginThunk = createAsyncThunk(
  'admin/login',
  async (adminLoginDto: TAdminLoginDto, { rejectWithValue }) => {
    try {
      const { token, user } = await authApi.adminLogin(adminLoginDto);
      if (!token || !user) {
        throw new Error('Ошибка регистрации администратора');
      }
      if (token && !!user) {
        setTokenAccess(token);
      }
      return { user };
    } catch (error) {
      const { message } = error as ErrorDto;
      return rejectWithValue(message as string);
    }
  }
);

export const newUserThunk = createAsyncThunk(
  'user/new',
  async (newUserDto: TNewUserRequestDto, { rejectWithValue }) => {
    try {
      const { token, user } = await authApi.createNewUser(newUserDto);
      if (!token || !user) {
        throw new Error('Ошибка регистрации пользователя');
      }
      if (token && !!user) {
        setTokenAccess(token);
      }
      return { user };
    } catch (error) {
      const { message } = error as ErrorDto;
      rejectWithValue(message as string);
    }
  }
);

export const checkTokenThunk = createAsyncThunk(
  'user/token',
  async (token: string, { rejectWithValue }) => {
    try {
      const user = await authApi.checkToken(token);
      console.dir(user);
      if (!user) {
        throw new Error('Ошибка получения пользователя по токену');
      }
      return { user };
    } catch (error) {
      const { message } = error as ErrorDto;
      rejectWithValue(message as string);
    }
  }
);
const systemSliceInitialState: TSystemSliceState = {
  user: null,
  vkUser: null,
  isPending: false,
  isNew: false,
  socketConnectionStatus: null,
  socketMessage: null,
};

const systemSlice = createSlice({
  name: 'system',
  initialState: systemSliceInitialState,
  reducers: {
    resetUser: () => systemSliceInitialState,
    startSocketConnection: (state) => {
      state.socketConnectionStatus = SocketConnectionStatus.INIT;
    },
    setSocketConnectionStatus: (state, action) => {
      state.socketConnectionStatus = action.payload;
    },
    setSocketMessage: (state, action) => {
      state.socketMessage = action.payload;
    },
    closeSocketConnection: (state) => {
      state.socketConnectionStatus = SocketConnectionStatus.CLOSED;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userLoginThunk.pending, (state, _) => ({
        ...state,
        error: null,
        isPending: true,
      }))
      .addCase(userLoginThunk.fulfilled, (state, action) => {
        if (!action.payload) {
          return state;
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { user = null, vkUser = null } = action.payload;
        return {
          ...state,
          user,
          vkUser: vkUser,
          isPending: false,
          isNew: !user && !!vkUser,
        };
      })
      .addCase(userLoginThunk.rejected, (state) => ({
        ...state,
        isPending: false,
      }))
      .addCase(newUserThunk.pending, (state, _) => ({
        ...state,
        error: null,
        isPending: true,
      }))
      .addCase(newUserThunk.fulfilled, (state, action) => {
        if (!action.payload) {
          return state;
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { user = null } = action.payload;
        return {
          ...state,
          user,
          vk_user: null,
          isPending: false,
          isNew: false,
        };
      })
      .addCase(newUserThunk.rejected, (state) => ({
        ...state,
        isPending: false,
        isNew: false,
      }))
      .addCase(checkTokenThunk.pending, (state) => ({
        ...state,
        error: null,
        isPending: true,
      }))
      .addCase(checkTokenThunk.fulfilled, (state, action) => {
        if (!action.payload) {
          return state;
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { user = null } = action.payload;
        return {
          ...state,
          user,
          isPending: false,
        };
      })
      .addCase(checkTokenThunk.rejected, (state) => ({
        ...state,
        isPending: false,
      }))
      .addCase(adminLoginThunk.pending, (state) => ({
        ...state,
        error: null,
        isPending: true,
      }))
      .addCase(adminLoginThunk.fulfilled, (state, action) => {
        if (!action.payload) {
          return state;
        }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { user = null } = action.payload;
        return {
          ...state,
          user,
          isPending: false,
        };
      })
      .addCase(adminLoginThunk.rejected, (state) => ({
        ...state,
        isPending: false,
      })),
});

export const {
  resetUser,
  startSocketConnection,
  setSocketConnectionStatus,
  setSocketMessage,
  closeSocketConnection,
} = systemSlice.actions;
export default systemSlice.reducer;

export const actions = {
  ...systemSlice.actions,
  adminLoginThunk,
};
