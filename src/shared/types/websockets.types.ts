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

export type wsMessageKind = ValueOf<typeof wsMessageKind>;

export type wsTokenPayload = {
  user: AnyUserInterface;
  token: string;
};

export type wsMetaPayload = {
  system: Array<SystemChatMetaInterface>;
  tasks: Array<TaskChatMetaInterface>;
  conflicts: Array<ConflictChatsTupleMetaInterface>;
};

export type wsChatPageQueryPayload = {
  chatId: string;
  limit: number;
  skip: number;
};

export type wsMessagesPayload = { messages: Array<MessageInterface> };

export type wsDisconnectionPayload = {
  userId: string;
};

export type wsPayloadType =
  | wsTokenPayload
  | wsMetaPayload
  | wsChatPageQueryPayload
  | wsMessagesPayload
  | wsDisconnectionPayload;

export type wsMessageData = {
  data: wsPayloadType;
};

export type wsConnectedUserData = {
  user: AnyUserInterface;
  sockets: Array<string>;
};
