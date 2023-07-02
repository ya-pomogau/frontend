import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { api } from "../../../shared/api";

type TTasksState = {
  tasks: any[];
  isLoading: boolean;
  isFailed: boolean;
  error?: string;
}

const initialState: TTasksState = {
  tasks: [],
  isLoading: false,
  isFailed: false,
};

export const fetchTasksByVolunteerId = createAsyncThunk(
  'task/fetchData',
  async (id: number) => {
    const response = await api.getAllTasks();
    return response.filter((task) => task.volunteer?.id === id)
  }
);

export const taskModel = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByVolunteerId.pending, (state) => {
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(fetchTasksByVolunteerId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = [...action.payload];
      })
      .addCase(fetchTasksByVolunteerId.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.error.message;
      })
  },
});
