import { IFilterValues } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCustomSelector } from '../../../shared/types/store.types';

export type TInitialFilterData = {
  filterData: IFilterValues;
};

export const emptyFilterData: IFilterValues = {
  categories: [],
  searchRadius: '',
  sortBy: '',
  date: '',
  time: [],
  userCategories: [],
};

export const InitialStateFilterData: TInitialFilterData = {
  filterData: emptyFilterData,
};

export const filterDataSelector: TCustomSelector<IFilterValues> = (state) =>
  state.filterData.filterData;

export const filterDataModel = createSlice({
  name: 'filter-data',
  initialState: InitialStateFilterData,
  reducers: {
    setFilterData: (state, action: PayloadAction<IFilterValues>) => {
      state.filterData = action.payload;
    },
    resetFilterData: () => InitialStateFilterData,
  },
});

export const { setFilterData, resetFilterData } = filterDataModel.actions;
