import { Middleware } from 'redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { io, Socket } from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { WS_HOST } from '../config/api-config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  SocketConnectionStatus,
  wsEventMessage,
  wsTokenPayload,
} from '../shared/types/store.types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getTokenAccess, setTokenAccess } from '../shared/libs/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { setUser } from '../entities/user/model';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { actions } from './system-slice';
import { User } from 'entities/user/types';

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
        SocketConnectionStatus.CONNECTED;

    if (!socket && actions.startSocketConnection.match(action)) {
      console.log(`-> Starting connection to socket on ${WS_HOST}:`, action);

      socket = io(WS_HOST, {
        extraHeaders: {
          authorization: currToken as string,
        },
      });

      socket.on(wsEventMessage.ON_CONNECT, () => {
        console.log(`-> Connected to socket on ${WS_HOST}`);
        dispatch(
          actions.setSocketConnectionStatus(SocketConnectionStatus.CONNECTED)
        );
      });

      socket.emit(wsEventMessage.ON_TEST, testEventObj);
    }

    if (isSocketConnected) {
      socket.on(wsEventMessage.ON_MESSAGE, ({ data }) => {
        console.log(`-> The server has a message for you: ${data.message}`);
        dispatch(actions.setSocketMessage(data));
      });

      // обработчик получения обновленного токена и данных пользователя
      socket.on(wsEventMessage.ON_REFRESH_TOKEN, ({ data }) => {
        const { token, user } = data as wsTokenPayload;

        console.log(`-> The server send refreshed token for you: ${token}`);
        setTokenAccess(token);

        const { createdAt, updatedAt, location, ...userData } = user;
        dispatch(
          setUser({ ...userData, location: location?.coordinates } as User)
        );
      });

      socket.on(wsEventMessage.ON_CONNECT_ERROR, (error) => {
        console.log(`-> Connection error: ${error.message}`);
      });

      if (actions.closeSocketConnection.match(action)) {
        console.log(`-> Socket connection is closing`);
        socket.disconnect();
      }

      socket.on(wsEventMessage.ON_DISCONNECT, (reason) => {
        dispatch(
          actions.setSocketConnectionStatus(SocketConnectionStatus.DISCONNECTED)
        );
        console.log(`-> Socket connection was dropped: ${reason}`);
      });
    }

    next(action);
  };
};
