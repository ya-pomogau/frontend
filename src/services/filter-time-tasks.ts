import { createSlice } from '@reduxjs/toolkit';

const initialState = { time: ['00:00', '00:00'] };

export const infoTimeFilterTask = createSlice({
  name: 'time',
  initialState,
  reducers: {
    updateInfoTimeFilter(state, action) {
      state.time = action.payload;
    },
    resetTimeFiler() {
      return initialState;
    },
  },
});

export const { updateInfoTimeFilter, resetTimeFiler } =
  infoTimeFilterTask.actions;
export default infoTimeFilterTask.reducer;
