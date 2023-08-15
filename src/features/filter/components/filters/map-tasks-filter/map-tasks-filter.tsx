import { useState } from 'react';

import { useAppSelector } from 'app/hooks';

import { FilterWrapper } from 'features/filter/components/filter-wrapper';
import { IFilterValues, IMapTasksFilterValues } from 'features/filter/types';
import { CategoriesBlock } from 'features/filter/ui/categories-block';
import { RadiusBlock } from 'features/filter/ui/radius-block';
import { CalenderBlock } from 'features/filter/ui/calender-block';

export const MapTasksFilter = () => {
  const { role } = useAppSelector((state) => state.user);

  const [filterValues, setFilterValues] = useState<IMapTasksFilterValues>({
    categories: [],
    searchRadius: '',
    date: '',
  });

  const handleFilterChange = (
    name: string,
    value: string | string[] | boolean
  ) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  const setFilterState = (value: IFilterValues) => {
    setFilterValues(value as IMapTasksFilterValues);
  };

  if (role === 'volunteer') {
    return (
      <FilterWrapper
        filterMenu={
          <>
            <CategoriesBlock
              selectedCategories={filterValues.categories}
              onChange={handleFilterChange}
            />
            <RadiusBlock
              filter={filterValues.searchRadius}
              onChange={handleFilterChange}
              modeOfProfile={'map'}
            />
            <CalenderBlock
              filterDate={filterValues.date}
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
