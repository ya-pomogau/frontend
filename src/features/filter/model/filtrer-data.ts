import { IFilterValues } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { TCustomSelector } from '../../../shared/types/store.types';

export type TInitialFilterData = {
  filterData: IFilterValues;
};

export const InitialStateFilterData: TInitialFilterData = {
  filterData: {
    categories: [],
    searchRadius: '',
    sortBy: '',
    date: '',
    time: [],
    userCategories: [],
  },
};

export const filterDataSelector: TInitialFilterData = (state) =>
  state.filterData;

export const filterDataModel = createSlice({
  name: 'filter-data',
  initialState: InitialStateFilterData,
  reducers: {
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    resetFilterData: () => InitialStateFilterData,
  },
});

export const { setFilterData, resetFilterData } = filterDataModel.actions;
