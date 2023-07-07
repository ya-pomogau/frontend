import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import isFuture from "date-fns/isFuture";

import { api } from "../../../shared/api";
import type { Task } from "../types";

type TasksState = {
  tasks: {
    available: Task[],
    active: Task[],
    completed: Task[],
  };
  isLoading: boolean;
  isFailed: boolean;
  error?: string;
}

const initialState: TasksState = {
  tasks: {
    available: [],
    active: [],
    completed: [],
  },
  isLoading: false,
  isFailed: false,
};

export const fetchTasksByVolunteerId = createAsyncThunk(
  'task/fetchData',
  async (id: number) => {
    const response = await api.getAllTasks();
    return { id, tasks: response };
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
        const { id, tasks } = action.payload;

        state.tasks = {
          available: tasks.filter((task) => 
            task.volunteer === null &&
            isFuture(new Date(task.date))
          ),
          active: tasks.filter((task) => 
            task.volunteer?.id === id &&
            (!task.completed || !task.confirmed)
          ),
          completed: tasks.filter((task) => 
            task.volunteer?.id === id &&
            task.completed &&
            task.confirmed
          ),
        };
        state.isLoading = false;
      })
      .addCase(fetchTasksByVolunteerId.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.error.message;
      })
  },
});
