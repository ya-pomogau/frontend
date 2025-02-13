import { TUser } from '../../entities/user/types';

export enum SocketConnectionStatus {
  INIT = 'init', //подключение устанавливается
  CONNECT_ERROR = 'connect_error', //ошибка подключения
  CONNECTED = 'connected', //подключение установлено
  CLOSED = 'closed', //подключение закрыто
  DISCONNECTED = `disconnected`, //подключение прервано
}

export const wsMessageKind = {
  REFRESH_TOKEN_COMMAND: 'RefreshToken',
  REFRESH_CHATS_META_COMMAND: 'RefreshMeta',
  INITIAL_CHATS_META_COMMAND: 'InitialMeta',
  NEW_CHATS_META_COMMAND: 'NewMeta',
  NEW_MESSAGE_COMMAND: 'NewMessage',
  REFRESH_CP_COMMAND: 'RefreshCP',
  REFRESH_CONTACTS_COMMAND: 'RefreshContacts',
  NEW_BLOG_POST_COMMAND: 'NewPost',
  CHAT_PAGE_QUERY: `PageQuery`,
  CHAT_PAGE_CONTENT: 'ChatPage',
  DISCONNECTION_EVENT: 'Disconnection',
  CONNECTION_EVENT: 'Connection',
  OPEN_CHAT_EVENT: 'OpenChat',
  CLOSE_CHAT_EVENT: 'CloseChat',
  UPDATE_LASTREAD_COMMAND: 'UpdateLastread',
} as const;

export type WsMessageKind = keyof typeof wsMessageKind;

export type wsTokenPayload = {
  user: TUser;
  token: string;
};

export type wsTestMessage = {
  data: object | string;
};
