import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { authApi } from './auth';
import {
  ErrorDto,
  TAdminLoginDto,
  TNewUserRequestDto,
  TVKLoginRequestDto,
  TMockLoginRequestDto,
} from './auth.types';
import {
  TCustomSelector,
  TSystemSliceState,
} from '../shared/types/store.types';
import { RootState } from '../app/store';
import { TUser, TVKUser } from '../entities/user/types';
import { AdminPermission } from '../shared/types/common.types';
import { setTokenAccess } from 'shared/libs/utils';
import {
  AnyUserChatsResponseInterface,
  MessageInterface,
  SystemChatInfo,
  TaskChatInfo,
  TaskChatMetaInterface,
} from '../shared/types/chat.types';

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

export const mockUserLoginThunk = createAsyncThunk(
  'user/mockLogin',
  async (vkId: string, { rejectWithValue }) => {
    try {
      const mockLoginDto: TMockLoginRequestDto = { vkId };
      const { token, user } = await authApi.mockLogin(mockLoginDto);
      if (!token || !user) {
        throw new Error('Ошибка выполнения mockLogin');
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

const taskChatAdapter = createEntityAdapter<TaskChatInfo>({
  selectId: (entity) => entity.meta._id,
});

const systemChatAdapter = createEntityAdapter<SystemChatInfo>({
  selectId: (entity) => entity.meta._id,
});

const taskChatSelectors = taskChatAdapter.getSelectors(
  (state: RootState) => state?.system?.chats.task
);

const getChatMetaByTaskId = (taskId: string) => (state: RootState) => {
  const allTaskMeta = taskChatSelectors.selectAll(state);

  const filteredMeta = allTaskMeta.filter(({ meta }) => meta.taskId === taskId);

  return filteredMeta.length ? filteredMeta[0] : null;
};

const systemSliceInitialState: TSystemSliceState = {
  user: null,
  vkUser: null,
  isPending: false,
  isNew: false,
  chats: {
    task: taskChatAdapter.getInitialState(),
    system: systemChatAdapter.getInitialState(),
  },
};

const systemSlice = createSlice({
  name: 'system',
  initialState: systemSliceInitialState,
  reducers: {
    resetUser: () => systemSliceInitialState,
    setChatsMeta: (
      state,
      { payload }: PayloadAction<AnyUserChatsResponseInterface>
    ) => {
      const { system, task } = payload;

      taskChatAdapter.setAll(state.chats.task, task);
      systemChatAdapter.setAll(state.chats.system, system);
    },
    addChatMeta: (
      state,
      { payload }: PayloadAction<AnyUserChatsResponseInterface>
    ) => {
      const { system, task } = payload;

      if (task.length) {
        task.forEach((newMeta) => {
          taskChatAdapter.addOne(state.chats.task, newMeta);
        });
      }

      if (system.length) {
        system.forEach((newMeta) => {
          systemChatAdapter.addOne(state.chats.system, newMeta);
        });
      }
    },
    updateMeta: (
      state,
      { payload }: PayloadAction<{ tasks: TaskChatMetaInterface[] }>
    ) => {
      const { tasks } = payload;

      if (tasks.length) {
        tasks.forEach((newMeta) => {
          taskChatAdapter.updateOne(state.chats.task, {
            id: newMeta._id,
            changes: {
              meta: newMeta as TaskChatInfo['meta'],
            },
          });
        });
      }
    },
    addMessageToChat: (
      state,
      {
        payload,
      }: PayloadAction<
        | MessageInterface
        | {
            chatId: string;
            messages: MessageInterface[];
          }
      >
    ) => {
      const allEntities = {
        ...state.chats.task.entities,
        ...state.chats.system.entities,
      };

      const chat = allEntities[payload.chatId];

      if (chat) {
        if ('messages' in payload) {
          chat.chats = payload.messages;
        } else {
          chat.chats.push(payload);
        }
      }
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
      }))
      .addCase(mockUserLoginThunk.pending, (state) => ({
        ...state,
        error: null,
        isPending: true,
      }))
      .addCase(mockUserLoginThunk.fulfilled, (state, action) => {
        if (!action.payload) {
          return state;
        }
        const { user = null } = action.payload;
        return {
          ...state,
          user,
          vkUser: null,
          isPending: false,
          isNew: false,
        };
      })
      .addCase(mockUserLoginThunk.rejected, (state, action) => ({
        ...state,
        isPending: false,
        error: action.payload as string,
      })),
});

export const {
  resetUser,
  setChatsMeta,
  addMessageToChat,
  addChatMeta,
  updateMeta,
} = systemSlice.actions;
export default systemSlice.reducer;

export const actions = {
  ...systemSlice.actions,
  getChatMetaByTaskId,
  adminLoginThunk,
  mockUserLoginThunk,
};
