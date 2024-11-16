import { Middleware } from 'redux';
import { io, Socket } from 'socket.io-client';

import { WS_HOST } from '../config/api-config';
import { getTokenAccess } from '../shared/libs/utils';
import { addChatMeta, addMessageToChat, setChatsMeta } from './system-slice';
import { wsMessageKind } from '../shared/types/websocket.types';
import { AnyUserChatsResponseInterface } from '../shared/types/chat.types';

export const websocketMiddleware = (
  wsActions: typeof wsMessageKind
): Middleware<unknown> => {
  return (store) => {
    let socket: Socket | null = null;
    let isConnected = false;

    const {
      CONNECTION_EVENT,
      OPEN_CHAT_EVENT,
      CLOSE_CHAT_EVENT,
      NEW_MESSAGE_COMMAND,
      INITIAL_CHATS_META_COMMAND,
      NEW_CHATS_META_COMMAND,
    } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      const token = getTokenAccess();

      if (type === CONNECTION_EVENT) {
        socket = io(WS_HOST, {
          extraHeaders: {
            authorization: token as string,
          },
        });

        isConnected = true;

        socket.on(
          INITIAL_CHATS_META_COMMAND,
          (event: { data: AnyUserChatsResponseInterface }) => {
            const { data } = event;
            dispatch(setChatsMeta(data));
          }
        );

        socket.on(
          NEW_CHATS_META_COMMAND,
          (event: { data: AnyUserChatsResponseInterface }) => {
            const { data } = event;
            dispatch(addChatMeta(data));
          }
        );

        socket.on(wsMessageKind.NEW_MESSAGE_COMMAND, ({ data }) => {
          dispatch(addMessageToChat(data));
        });
      }

      if (type === NEW_MESSAGE_COMMAND && isConnected) {
        socket?.emit(NEW_MESSAGE_COMMAND, {
          data: payload,
        });
      }

      if (type === OPEN_CHAT_EVENT && isConnected) {
        socket?.emit(OPEN_CHAT_EVENT, {
          data: payload,
        });
      }

      if (type === CLOSE_CHAT_EVENT && isConnected) {
        socket?.emit(CLOSE_CHAT_EVENT, {
          data: payload,
        });
      }

      // TODO: добавить обработку успешного/ неуспешного подключения, дисконекта и т.д.

      next(action);
    };
  };
};
