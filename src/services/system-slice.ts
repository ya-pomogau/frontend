import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth';
import { ErrorDto, TVKLoginRequestDto } from './auth.types';
import {
  TCustomSelector,
  TSystemSliceState,
} from '../shared/types/store.types';
import { RootState } from '../app/store';
import { TUser, TVKUser } from '../entities/user/types';
import { AdminPermission } from '../shared/types/common.types';

export const isPendingSelector: TCustomSelector<boolean> = (state: RootState) =>
  state.system.isPending;

export const userSelector: TCustomSelector<TUser | null> = (state) =>
  state.system.user;

export const vkUserSelector: TCustomSelector<TVKUser | null> = (state) =>
  state.system.vk_user;

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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { token, user, vk_user } = await authApi.vkLogin(userLoginDto);
      if (token && !!user) {
        localStorage.setItem('token', token);
      }
      return { user, vk_user };
    } catch (error) {
      const { message } = error as ErrorDto;
      rejectWithValue(message as string);
    }
  }
);

const systemSliceInitialState: TSystemSliceState = {
  user: null,
  vk_user: null,
  isPending: false,
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
        const { user = null, vk_user = null } = action.payload;
        return { ...state, user, vk_user, isPending: false };
      })
      .addCase(userLoginThunk.rejected, (state) => ({
        ...state,
        isPending: false,
      })),
});

export const { resetUser } = systemSlice.actions;
export default systemSlice.reducer;
