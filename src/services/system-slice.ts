import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth';
import {
  ErrorDto,
  TAdminLoginDto,
  TNewUserRequestDto,
  TVKLoginRequestDto,
  TVKUserResponseObj,
} from './auth.types';
import {
  TCustomSelector,
  TSystemSliceState,
} from '../shared/types/store.types';
import { RootState } from '../app/store';
import { TUser, TVKUser } from '../entities/user/types';
import { AdminPermission } from '../shared/types/common.types';

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
      const vkUser = vkUserResponse
        ? Object.entries(vkUserResponse.response[0]).reduce(
            (acc, [key, value]) => {
              const tmp: Partial<TVKUser> = {};
              switch (key) {
                case 'first_name': {
                  return { ...acc, firstName: value };
                }
                case 'last_name': {
                  return { ...acc, lastName: value };
                }
                case 'id': {
                  return { ...acc, vkId: value };
                }
                default: {
                  return acc;
                }
              }
            },
            {} as TVKUser
          )
        : null;
      if (token && !!user) {
        localStorage.setItem('token', token);
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
        localStorage.setItem('token', token);
      }
      return { user };
    } catch (error) {
      const { message } = error as ErrorDto;
      console.log(`Error message: ${message}`);
      rejectWithValue(message as string);
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
        localStorage.setItem('token', token);
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
};

const systemSlice = createSlice({
  name: 'system',
  initialState: systemSliceInitialState,
  reducers: {
    resetUser: () => systemSliceInitialState,
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
      .addCase(checkTokenThunk.pending, (state, _) => ({
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
      .addCase(adminLoginThunk.pending, (state, _) => ({
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

export const { resetUser } = systemSlice.actions;
export default systemSlice.reducer;
