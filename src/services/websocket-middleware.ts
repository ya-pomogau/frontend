import { Middleware } from 'redux';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { io, Socket } from 'socket.io-client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { API_HOST } from '../config/api-config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {
  SocketConnectionStatus,
  SocketEvent,
} from '../shared/types/store.types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getTokenAccess } from '../shared/libs/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { actions } from './system-slice';

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
    // const { dispatch } = store;
    // const token = getTokenAccess();
    //
    // const isSocketConnected =
    //   socket &&
    //   store.getState().system.socketConnectionStatus ===
    //     SocketConnectionStatus.CONNECTED;
    //
    // if (!socket && actions.startSocketConnection.match(action)) {
    //   console.log(`-> Starting connection to socket on ${API_HOST}:`, action);
    //
    //   socket = io(API_HOST, {
    //     extraHeaders: {
    //       authorization: token as string,
    //     },
    //   });
    //
    //   socket.on(SocketEvent.CONNECT, () => {
    //     console.log(`-> Connected to socket on ${API_HOST}`);
    //     dispatch(
    //       actions.setSocketConnectionStatus(SocketConnectionStatus.CONNECTED)
    //     );
    //   });
    //
    //   socket.on(SocketEvent.CONNECT_USER_MESSAGE, ({ data }) => {
    //     console.log(`-> The server has a message for you: ${data.message}`);
    //     dispatch(actions.setSocketMessage(data));
    //   });
    //
    //   socket.emit(SocketEvent.TEST, testEventObj);
    // }
    //
    // if (isSocketConnected) {
    //   socket.on(SocketEvent.MESSAGE, ({ data }) => {
    //     console.log(`-> The server has a message for you: ${data.message}`);
    //     dispatch(actions.setSocketMessage(data));
    //   });
    //
    //   socket.on(SocketEvent.CONNECT_ERROR, (error) => {
    //     console.log(`-> Connection error: ${error.message}`);
    //   });
    //
    //   if (actions.closeSocketConnection.match(action)) {
    //     console.log(`-> Socket connection is closing`);
    //     socket.disconnect();
    //   }
    //
    //   socket.on(SocketEvent.DISCONNECT, (reason) => {
    //     dispatch(
    //       actions.setSocketConnectionStatus(SocketConnectionStatus.DISCONNECTED)
    //     );
    //     console.log(`-> Socket connection was dropped: ${reason}`);
    //   });
    // }

    next(action);
  };
};