export interface IFilterValues {
  categories: string[];
  searchRadius: string;
  sortBy: string;
  date: string;
  time: string[];
  userCategories: string[];
}

export interface FilteringProps {
  items: {
    categories?: boolean;
    radius?: boolean;
    sort?: boolean;
    date?: boolean;
    time?: boolean;
    userCategories?: boolean;
  };
  setFilteres?: (date: IFilterValues) => void;
  notFoundFilter?: never;
}

export interface NotFoundFilterProps {
  items?: never;
  setFilteres?: (date: IFilterValues) => void;
  notFoundFilter: boolean;
}

export type FilterProps = FilteringProps | NotFoundFilterProps;
