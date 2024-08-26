export interface IFilterValues {
  categories: string[];
  searchRadius: string;
  sortBy: string;
  date: string;
  time: string[];
  userCategories: string[];
}

export interface FilteringProps {
  items: Partial<IFilterValues>;
  setFilterData?: (filterData: Partial<IFilterValues>) => void;
  setFilteres?: (date: IFilterValues) => void;
  notFoundFilter?: never;
}

export interface NotFoundFilterProps {
  items?: never;
  setFilterData?: (filterData: Partial<IFilterValues>) => void;
  setFilteres?: (date: IFilterValues) => void;
  notFoundFilter: boolean;
}

export type FilterProps = FilteringProps | NotFoundFilterProps;
