import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorState } from '../types';

const initialState: ErrorState = {
  isError: false,
  errorText: null,
};

export const errorModel = createSlice({
  name: 'user',
  initialState,
  reducers: {
    enableError: (state, { payload }: PayloadAction<string>) => {
      state.isError = true;
      state.errorText = payload;
    },
    resetError: (state) => {
      state.errorText = null;
      state.isError = false;
    },
  },
});

export const { resetError, enableError } = errorModel.actions;
