import { TUser, TVKUser } from '../../entities/user/types';
import { RootState } from '../../app/store';
import { IFilterValues } from '../../features/filter/types';

export enum SocketEvent {
  CONNECT = 'connect',
  CONNECT_USER_MESSAGE = 'connect_user',
  MESSAGE = 'message',
  CONNECT_ERROR = 'connect_error',
  DISCONNECT = 'disconnect',
  CLOSE = 'close',
  TEST = 'test_event', //временное событие, удалить после реализации нужного
}

export enum SocketConnectionStatus {
  INIT = 'init', //подключение устанавливается
  CONNECT_ERROR = 'connect_error', //ошибка подключения
  CONNECTED = 'connected', //подключение установлено
  CLOSED = 'closed', //подключение закрыто
  DISCONNECTED = `disconnected`, //подключение прервано
}

export type TSocketMessage = {
  data: object | string;
};

export type TSystemSliceState = {
  user: TUser | null;
  vkUser: TVKUser | null;
  isPending: boolean;
  isNew: boolean;
  socketConnectionStatus: SocketConnectionStatus | null;
  socketMessage: TSocketMessage | null;
};

export type TCustomSelector<T> = (state: RootState) => T;
