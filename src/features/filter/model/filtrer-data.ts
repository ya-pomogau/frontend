import { IFilterValues } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCustomSelector } from '../../../shared/types/store.types';

export const emptyFilterData: IFilterValues = {
  categories: [],
  searchRadius: '',
  sortBy: '',
  date: '',
  time: [],
  userCategories: ['all'],
};

export const InitialStateFilterData: IFilterValues = emptyFilterData;

export const filterDataSelector: TCustomSelector<IFilterValues> = (state) =>
  state.filterData;

export const filterDataModel = createSlice({
  name: 'filter-data',
  initialState: InitialStateFilterData,
  reducers: {
    setFilterData: (state, action: PayloadAction<IFilterValues>) => {
      (Object.keys(state) as (keyof IFilterValues)[]).map((key) => {
        state[key] = action.payload[key] as string & string[];
      });
    },
    resetFilterData: () => InitialStateFilterData,
  },
});

export const { setFilterData, resetFilterData } = filterDataModel.actions;
