import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth';
import { ErrorDto, TNewUserRequestDto, TVKLoginRequestDto } from './auth.types';
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
  !!state.system.user && state.system.user.isRoot;

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
      const {
        token,
        user,
        vkUser: { response },
      } = tmpRes;
      console.dir(response);
      const { first_name, last_name, id } = response[0];
      const vkUser = { firstName: first_name, lastName: last_name, vkId: id };
      if (token && !!user) {
        localStorage.setItem('token', token);
      }
      console.log('user:');
      console.dir(user);
      console.log('vkUser:');
      console.dir(vkUser);
      return { user, vkUser };
    } catch (error) {
      console.log('error:');
      console.dir(error);
      const { message } = error as ErrorDto;
      console.log(`Error message: ${message}`);
      rejectWithValue(message as string);
    }
  }
);

export const newUserThunk = createAsyncThunk(
  'user/new',
  async (newUserDto: TNewUserRequestDto, { rejectWithValue }) => {
    console.log('newUserDto:');
    console.dir(newUserDto);
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
      })),
});

export const { resetUser } = systemSlice.actions;
export default systemSlice.reducer;
