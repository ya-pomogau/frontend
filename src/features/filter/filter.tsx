import { useState } from 'react';

import { FilterWrapper } from 'features/filter/components/filter-wrapper';
import { IFilterValues } from 'features/filter/types';
import { SortByBlock } from 'features/filter/ui/sortBy-block';
import { CategoriesBlock } from 'features/filter/ui/categories-block';
import { RadiusBlock } from 'features/filter/ui/radius-block';
import { CalenderBlock } from 'features/filter/ui/calender-block';
import { UserCategoriesBlock } from 'features/filter/ui/userCategories-block';
import { TimeBlock } from './ui/time-block';
import { CategoriesServies } from './ui/categories-types';

export interface FilteringProps {
  items: {
    categories?: boolean;
    radius?: boolean;
    sort?: boolean;
    date?: boolean;
    time?: boolean;
    servies?: boolean;
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

export const Filter = ({
  items,
  notFoundFilter = false,
  setFilteres,
}: FilterProps) => {
  const [filterValues, setFilterValues] = useState<IFilterValues>({
    sortBy: '',
    categories: [],
    searchRadius: '',
    date: '',
    time: ['00:00', '00:00'],
  });

  const handleFilterChange = (
    name: string,
    value: string | string[] | boolean
  ) => {
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilterValues({
      sortBy: '',
      categories: [],
      searchRadius: '',
      date: '',
      time: ['00:00', '00:00'],
    });
  };

  if (notFoundFilter) {
    return null;
  }

  return (
    <FilterWrapper
      filterMenu={
        <>
          {items?.sort && (
            <SortByBlock
              filter={filterValues.sortBy}
              onChange={handleFilterChange}
            />
          )}
          {items?.servies && (
            <CategoriesServies
              selectedServies={filterValues.categories}
              onChange={handleFilterChange}
            />
          )}

          {items?.categories && (
            <CategoriesBlock
              selectedCategories={filterValues.categories}
              onChange={handleFilterChange}
            />
          )}

          {items?.userCategories && (
            <UserCategoriesBlock
              filter={filterValues.categories}
              onChange={handleFilterChange}
            />
          )}

          {items?.radius && (
            <RadiusBlock
              filter={filterValues.searchRadius}
              onChange={handleFilterChange}
            />
          )}

          {items?.time && (
            <TimeBlock
              filterTime={filterValues.time}
              onChange={handleFilterChange}
            />
          )}

          {items?.date && (
            <CalenderBlock
              filterDate={filterValues.date}
              onChange={handleFilterChange}
            />
          )}
        </>
      }
      filterValues={filterValues}
      setFilterValues={setFilterValues}
      onReset={handleReset}
      setFilteres={setFilteres}
    />
  );
};
