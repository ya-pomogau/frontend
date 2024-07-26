import { createSlice } from '@reduxjs/toolkit';

export interface SocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  test: boolean;
}

const initialState: SocketState = {
  isEstablishingConnection: false,
  isConnected: false,
  test: false,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    testEvent: (state) => {
      state.test = true;
    },
  },
});

export const socketActions = socketSlice.actions;
