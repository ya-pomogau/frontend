import { TUser, TVKUser } from '../../entities/user/types';
import { RootState } from '../../app/store';
import { SocketConnectionStatus } from './websocket.types';

export type TSystemSliceState = {
  user: TUser | null;
  vkUser: TVKUser | null;
  isPending: boolean;
  isNew: boolean;
  socketConnectionStatus: SocketConnectionStatus | null;
};

export type TCustomSelector<T> = (state: RootState) => T;
