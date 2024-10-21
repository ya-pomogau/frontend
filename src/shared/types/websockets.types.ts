import {
  ConflictChatsTupleMetaInterface,
  MessageInterface,
  SystemChatMetaInterface,
  TaskChatMetaInterface,
} from './chat.types';
import { ValueOf } from './common.types';
import { AnyUserInterface } from './user.type';

export const wsMessageKind = {
  REFRESH_TOKEN_COMMAND: 'RefreshToken',
  REFRESH_CHATS_META_COMMAND: 'RefreshMeta',
  NEW_MESSAGE_COMMAND: 'NewMessage',
  REFRESH_CP_COMMAND: 'RefreshCP',
  REFRESH_CONTACTS_COMMAND: 'RefreshContacts',
  NEW_BLOG_POST_COMMAND: 'NewPost',
  CHAT_PAGE_QUERY: `PageQuery`,
  CHAT_PAGE_CONTENT: 'ChatPage',
  DISCONNECTION_EVENT: 'Disconnection',
} as const;

export type WsMessageKind = ValueOf<typeof wsMessageKind>;

export type WsTokenPayload = {
  user: AnyUserInterface;
  token: string;
};

export type WsMetaPayload = {
  system: Array<SystemChatMetaInterface>;
  tasks: Array<TaskChatMetaInterface>;
  conflicts: Array<ConflictChatsTupleMetaInterface>;
};

export type WsChatPageQueryPayload = {
  chatId: string;
  limit: number;
  skip: number;
};

export type WsMessagesPayload = { messages: Array<MessageInterface> };

export type WsDisconnectionPayload = {
  userId: string;
};

export type WsPayloadType =
  | WsTokenPayload
  | WsMetaPayload
  | WsChatPageQueryPayload
  | WsMessagesPayload
  | WsDisconnectionPayload;

export type WsMessageData = {
  data: WsPayloadType;
};

export type WsConnectedUserData = {
  user: AnyUserInterface;
  sockets: Array<string>;
};
