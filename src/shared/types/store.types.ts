import { TUser, TVKUser } from '../../entities/user/types';
import { RootState } from '../../app/store';

export enum SocketEvent {
  CONNECT = 'connect',
  CONNECT_ERROR = 'connect_error',
  DISCONNECT = 'disconnect',
  CLOSE = 'close',
  MESSAGE = 'message',
  TEST = 'test_event', //временное событие, удалить после реализации нужного события
}

export enum SocketConnectionStatus {
  INIT = 'init', //подключение устанавливается
  CONNECT_ERROR = 'connect_error', //ошибка подключения
  CONNECTED = 'connected', //подключение установлено
  CLOSED = 'closed', //подключение закрыто
  DISCONNECTED = `disconnected`, //подключение прервано
}

export type TSocketMessage = {
  event: string;
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
