import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';

import { IConflict } from '../libs/types';
import { getConflictList } from '../libs/utils';

type ConflictState = {
  conflictList: Array<IConflict>;
  conflictLoading: boolean;
  conflictLoadError?: SerializedError | undefined;
};

const initialState: ConflictState = {
  conflictList: [],
  conflictLoading: false,
  conflictLoadError: undefined,
};

export const getSelectedConflict = (
  { conflictList }: ConflictState,
  conflictId: string
) => {
  return conflictList.find((conflict) => conflict.conflictId === conflictId);
};

export const fetchConflictList = createAsyncThunk(
  'conflict/fetchConflicts',
  async () => {
    return getConflictList();
  }
);

export const conflictModel = createSlice({
  name: 'conflict',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConflictList.pending, (state) => {
        state.conflictLoading = true;
        state.conflictLoadError = undefined;
      })
      .addCase(fetchConflictList.fulfilled, (state, action) => {
        state.conflictList = action.payload;
        state.conflictLoading = false;
      })
      .addCase(fetchConflictList.rejected, (state, action) => {
        state.conflictList = [];
        state.conflictLoadError = action.error;
        state.conflictLoading = false;
      });
  },
});
