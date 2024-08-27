import { TUser, TVKUser } from '../../entities/user/types';
import { RootState } from '../../app/store';

export enum SocketConnectionStatus {
  INIT = 'init', //подключение устанавливается
  CONNECT_ERROR = 'connect_error', //ошибка подключения
  CONNECTED = 'connected', //подключение установлено
  CLOSED = 'closed', //подключение закрыто
  DISCONNECTED = `disconnected`, //подключение прервано
}

// TODO: Сверить и привести к единообразию интерфейсы сообщений на фронте и на бэке
export enum wsEventMessage {
  ON_CONNECT = 'connect',
  ON_CONNECT_ERROR = 'connect_error',
  ON_DISCONNECT = 'disconnect',
  ON_MESSAGE = 'message',
  ON_TEST = 'test_event', //временное событие, удалить после реализации нужного
  ON_ERROR = 'error',
  ON_REFRESH_TOKEN = 'RefreshToken',
  ON_DISCONNECTION = 'Disconnection',
  EMIT_CLOSE = 'close',
}

export type wsTokenPayload = {
  user: TUser;
  token: string;
};

export type wsTestMessage = {
  data: object | string;
};

export type TSystemSliceState = {
  user: TUser | null;
  vkUser: TVKUser | null;
  isPending: boolean;
  isNew: boolean;
  socketConnectionStatus: SocketConnectionStatus | null;
  socketMessage: wsTestMessage | null;
};

export type TCustomSelector<T> = (state: RootState) => T;
