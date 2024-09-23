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
  socketConnectionStatus,
  socketEvent,
} from '../shared/types/store.types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getTokenAccess } from '../shared/libs/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { actions } from './system-slice';

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
    next(action);
  };
};
