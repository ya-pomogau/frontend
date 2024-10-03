import { Middleware } from 'redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { io, Socket } from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { WS_HOST } from '../config/api-config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getTokenAccess, setTokenAccess } from '../shared/libs/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  socketConnectionStatus,
  socketEvent,
} from '../shared/types/store.types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { User } from '../entities/user/types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { actions } from './system-slice';
import { wsMessageKind, wsTokenPayload } from '../shared/types/websocket.types';
import { setUser } from '../entities';

// Объект для отправки тестового message. Удалить после реализации продовой версии
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const testEventObj = {
  event: 'test_event',
  data: {
    string: 'some text',
    object: {
      field: 'some text',
    },
    array: ['item1', 'item2'],
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const websocketMiddleware: Middleware = (store) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let socket: Socket;

  return (next) => (action) => {
    const { dispatch } = store;
    const currToken = getTokenAccess();

    const isSocketConnected =
      socket &&
      store.getState().system.socketConnectionStatus ===
        socketConnectionStatus.CONNECTED;

    if (!socket && actions.startSocketConnection.match(action)) {
      console.log(`-> Starting connection to socket on ${WS_HOST}:`, action);

      socket = io(WS_HOST, {
        extraHeaders: {
          authorization: currToken as string,
        },
      });

      socket.on(socketEvent.CONNECT, () => {
        console.log(`-> Connected to socket on ${WS_HOST}`);
        dispatch(
          actions.setSocketConnectionStatus(socketConnectionStatus.CONNECTED)
        );
      });

      socket.emit(wsMessageKind.TEST_EVENT, testEventObj);
    }

    if (isSocketConnected) {
      socket.on(wsMessageKind.NEW_MESSAGE, ({ data }) => {
        console.log(`-> The server has a message for you: ${data}`);
      });

      // обработчик получения обновленного токена и данных пользователя
      socket.on(wsMessageKind.REFRESH_TOKEN, ({ data }) => {
        const { token, user } = data as wsTokenPayload;

        console.log(`-> The server send refreshed token for you: ${token}`);
        setTokenAccess(token);

        const { createdAt, updatedAt, location, ...userData } = user;
        dispatch(
          setUser({ ...userData, location: location?.coordinates } as User)
        );
      });

      socket.on(wsMessageKind.CONNECT_ERROR, (error) => {
        console.log(`-> Connection error: ${error.message}`);
      });

      if (actions.closeSocketConnection.match(action)) {
        console.log(`-> Socket connection is closing`);
        socket.disconnect();
      }

      socket.on(wsMessageKind.DISCONNECT, (reason) => {
        dispatch(
          actions.setSocketConnectionStatus(socketConnectionStatus.DISCONNECTED)
        );
        console.log(`-> Socket connection was dropped: ${reason}`);
      });
    }

    next(action);
  };
};
