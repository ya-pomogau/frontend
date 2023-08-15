export interface IMapTasksFilterValues {
  categories: string[];
  searchRadius: string;
  date: string;
}

export interface IActiveTasksFilterValues {
  sortBy: string;
  categories: string[];
  searchRadius: string;
}

export type ICompletedTasksFilterValues = IActiveTasksFilterValues;

export interface IRequestsFilterValues {
  categories: string[];
}

export interface IAdminsTasksFilterValues {
  categories: string[];
  sortBy: string;
}

export type IFilterValues =
  | IMapTasksFilterValues
  | IActiveTasksFilterValues
  | ICompletedTasksFilterValues
  | IRequestsFilterValues
  | IAdminsTasksFilterValues;
