import { Middleware } from 'redux';
import { io, Socket } from 'socket.io-client';
import { socketActions } from 'entities/chat/model';

enum SocketEvent {
  Test = 'test_event',
}

export const websocketMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    const socketUrl = import.meta.env.VITE_APP_API_HOST;
    const isConnectionEstablished =
      socket && store.getState().socket.isConnected;

    if (socketActions.startConnecting.match(action)) {
      console.log(`-> Starting connection to socket on ${socketUrl}:`, action);

      socket = io(socketUrl);

      socket.on('connect', () => {
        store.dispatch(socketActions.connectionEstablished());
        console.log(`-> Connected to socket on ${socketUrl}`);
      });
    }

    if (socketActions.testEvent.match(action) && isConnectionEstablished) {
      socket.emit(SocketEvent.Test);
    }

    next(action);
  };
};
