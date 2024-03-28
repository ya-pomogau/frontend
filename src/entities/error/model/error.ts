import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorState } from '../types';
import { userLoginThunk } from '../../../services/system-slice';

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
  extraReducers: (builder) =>
    builder.addCase(userLoginThunk.rejected, (state, action) => ({
      ...state,
      errorText: action.payload as string,
      isError: true,
    })),
});

export const { resetError, enableError } = errorModel.actions;
