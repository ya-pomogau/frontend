import { useState } from 'react';

import { useAppSelector } from 'app/hooks';

import { FilterWrapper } from 'features/filter/components/filter-wrapper';
import {
  IFilterValues,
  ICompletedTasksFilterValues,
} from 'features/filter/types';
import { SortByBlock } from 'features/filter/ui/sortBy-block';
import { CategoriesBlock } from 'features/filter/ui/categories-block';

export const CompletedTasksFilter = () => {
  const { role } = useAppSelector((state) => state.user);

  const [filterValues, setFilterValues] = useState<ICompletedTasksFilterValues>(
    {
      sortBy: '',
      categories: [],
      searchRadius: '',
    }
  );

  const handleFilterChange = (
    name: string,
    value: string | string[] | boolean
  ) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  const setFilterState = (value: IFilterValues) => {
    setFilterValues(value as ICompletedTasksFilterValues);
  };

  if (role === 'volunteer') {
    return (
      <FilterWrapper
        filterMenu={
          <>
            <SortByBlock
              filter={filterValues.sortBy}
              onChange={handleFilterChange}
              userRole="volunteer"
            />
          </>
        }
        filterValues={filterValues}
        setFilterValues={setFilterState}
      />
    );
  }

  if (role === 'recipient') {
    return (
      <FilterWrapper
        filterMenu={
          <>
            <SortByBlock
              filter={filterValues.sortBy}
              onChange={handleFilterChange}
              userRole="recipient"
            />

            <CategoriesBlock
              selectedCategories={filterValues.categories}
              onChange={handleFilterChange}
            />
          </>
        }
        filterValues={filterValues}
        setFilterValues={setFilterState}
      />
    );
  }

  return (
    <FilterWrapper
      filterMenu={
        <span>Для такого вида профиля волонтёра нет подходящего фильтра</span>
      }
      filterValues={filterValues}
      setFilterValues={setFilterState}
    />
  );
};
