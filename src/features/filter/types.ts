export interface IFilterValues {
  categories: string[];
  searchRadius: string;
  sortBy: string;
  date: string;
  time: string[];
  userCategories: string[];
}

export type TFilterItems {
  [key in keyof IFilterValues]?: boolean;
}

export interface FilteringProps {
  items: TFilterItems;
  setFilteres?: (date: IFilterValues) => void;
  notFoundFilter?: never;
}

export interface NotFoundFilterProps {
  items?: never;
  setFilteres?: (date: IFilterValues) => void;
  notFoundFilter: boolean;
}

export type FilterProps = FilteringProps | NotFoundFilterProps;
