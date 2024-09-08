import { TUser } from '../../entities/user/types';

export enum SocketConnectionStatus {
  INIT = 'init', //подключение устанавливается
  CONNECT_ERROR = 'connect_error', //ошибка подключения
  CONNECTED = 'connected', //подключение установлено
  CLOSED = 'closed', //подключение закрыто
  DISCONNECTED = `disconnected`, //подключение прервано
}

// TODO: Сверить и привести к единообразию интерфейсы сообщений на фронте и на бэке
export const wsMessageKind = {
  CONNECT: 'connect',
  CONNECT_ERROR: 'connect_error',
  ERROR: 'error',
  DISCONNECT: 'disconnect',
  REFRESH_TOKEN: 'RefreshToken',
  REFRESH_CHATS_META: 'RefreshMeta',
  NEW_MESSAGE: 'NewMessage',
  REFRESH_CP: 'RefreshCP',
  REFRESH_CONTACTS: 'RefreshContacts',
  NEW_BLOG_POST: 'NewPost',
  CHAT_PAGE_CONTENT: 'ChatPage',
  CHAT_PAGE_QUERY: `PageQuery`,
  CLOSE: 'Close',
  DISCONNECTION: 'Disconnection',
  TEST_EVENT: 'test_event',
} as const;

export type wsMessageKind = keyof typeof wsMessageKind;

export type wsTokenPayload = {
  user: TUser;
  token: string;
};

export type wsTestMessage = {
  data: object | string;
};
