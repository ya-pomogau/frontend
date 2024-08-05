import { Middleware } from 'redux';
import { io, Socket } from 'socket.io-client';
import { API_HOST } from '../config/api-config';
import {
  SocketConnectionStatus,
  SocketEvent,
  TSocketMessage,
} from '../shared/types/store.types';
import { actions } from './system-slice';
import { getTokenAccess } from 'shared/libs/utils';

// Объект для отправки тестового message. Удалить после реализации продовой версии
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

export const websocketMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    const { dispatch } = store;
    const token = getTokenAccess();

    const isSocketConnected =
      socket &&
      store.getState().system.socketConnectionStatus ===
        SocketConnectionStatus.CONNECTED;

    if (!socket && actions.startSocketConnection.match(action)) {
      console.log(`-> Starting connection to socket on ${API_HOST}:`, action);

      socket = io(API_HOST, {
        extraHeaders: {
          authorization: token as string,
        },
      });

      socket.on(SocketEvent.CONNECT, () => {
        console.log(`-> Connected to socket on ${API_HOST}`);
        dispatch(
          actions.setSocketConnectionStatus(SocketConnectionStatus.CONNECTED)
        );
      });

      socket.emit(SocketEvent.TEST, testEventObj);
    }

    if (isSocketConnected) {
      socket.on(SocketEvent.MESSAGE, (message: TSocketMessage) => {
        dispatch(actions.setSocketMessage(message));
        console.log(`-> The following message was received: ${message}`);
      });

      socket.on(SocketEvent.CONNECT_ERROR, (error) => {
        console.log(`-> Connection error: ${error.message}`);
      });

      if (actions.closeSocketConnection.match(action)) {
        socket.emit(SocketEvent.CLOSE);
        console.log(`-> Socket connection is closing`);
      }

      socket.on(SocketEvent.DISCONNECT, (reason) => {
        dispatch(
          actions.setSocketConnectionStatus(SocketConnectionStatus.DISCONNECTED)
        );
        console.log(`-> Socket connection was dropped: ${reason}`);
      });
    }

    next(action);
  };
};
