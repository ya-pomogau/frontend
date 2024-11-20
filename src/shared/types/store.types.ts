import { TUser, TVKUser } from '../../entities/user/types';
import { RootState } from '../../app/store';
import { EntityState } from '@reduxjs/toolkit';
import { SystemChatInfo, TaskChatInfo } from './chat.types';

export type TSystemSliceState = {
  user: TUser | null;
  vkUser: TVKUser | null;
  isPending: boolean;
  isNew: boolean;
  chats: {
    task: EntityState<TaskChatInfo>;
    system: EntityState<SystemChatInfo>;
  };
};

export type TCustomSelector<T> = (state: RootState) => T;
