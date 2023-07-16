import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../shared/api';
import type { Task } from '../types';

type TasksState = {
  tasks: Task[];
  isLoading: boolean;
  isFailed: boolean;
  error?: string;
};

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  isFailed: false,
};

export const fetchAvailableTasks = createAsyncThunk(
  'task/fetchData/available',
  async () => {
    const response = await api.getAvailableTasks();
    return response;
  }
);

export const fetchActiveTasks = createAsyncThunk(
  'task/fetchData/active',
  async () => {
    const response = await api.getActiveTasks();
    return response;
  }
);

export const fetchCompletedTasks = createAsyncThunk(
  'task/fetchData/completed',
  async () => {
    const response = await api.getCompletedTasks();
    return response;
  }
);

export const taskModel = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTasks.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(fetchAvailableTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAvailableTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.error.message;
      })
      .addCase(fetchActiveTasks.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(fetchActiveTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchActiveTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.error.message;
      })
      .addCase(fetchCompletedTasks.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(fetchCompletedTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCompletedTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.error.message;
      });
  },
});
