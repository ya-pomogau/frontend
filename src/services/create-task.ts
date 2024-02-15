import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TPointGeoJSON } from 'entities/user/types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';

interface CreateTaskDto {
  categoryId: string;
  location: GeoCoordinates;
  date: Date | null;
  address: string;
  description: string;
}
const token = localStorage.getItem('token');
export const newTask = createAsyncThunk(
  'recipient/create',
  async (dto: CreateTaskDto) => {
    const response = await fetch('http://localhost:3001/recipient/tasks', {
      method: 'POST',
      headers: {
        //eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        //eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(dto),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('failed create task');
    }
  }
);

const createTaskSlice = createSlice({
  name: 'createTask',
  initialState: {
    task: null,
    isLoading: false,
    error: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(newTask.pending, (state, _) => ({
        ...state,
        error: false,
        isLoading: true,
      }))
      .addCase(newTask.fulfilled, (state, action) => {
        if (!action.payload) {
          return state;
        }
        return {
          ...state,
          task: action.payload,
          error: false,
          isLoading: false,
        };
      })
      .addCase(newTask.rejected, (state) => ({
        ...state,
        error: true,
        isLoading: false,
      }));
  },
});
export default createTaskSlice.reducer;
