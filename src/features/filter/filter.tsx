import { useState } from 'react';

import { FilterWrapper } from 'features/filter/components/filter-wrapper';
import { FilterProps, IFilterValues } from 'features/filter/types';
import { SortByBlock } from 'features/filter/ui/sortBy-block';
import { RadiusBlock } from 'features/filter/ui/radius-block';
import { CalenderBlock } from 'features/filter/ui/calender-block';
import { UserCategoriesBlock } from 'features/filter/ui/userCategories-block';
import { TimeBlock } from './ui/time-block';
import { CategoriesBlock } from './ui/categories-block';
import { defaultObjFilteres } from './consts';
import styles from './styles.module.css';

export const Filter = ({
  items,
  notFoundFilter = false,
  setFilteres,
}: FilterProps) => {
  const [filterValues, setFilterValues] =
    useState<IFilterValues>(defaultObjFilteres);

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
    setFilterValues(defaultObjFilteres);
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
          {items?.categories && (
            <CategoriesBlock
              selectedServies={filterValues.categories}
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
          <div className={styles.dateBlock}>
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
          </div>
        </>
      }
      filterValues={filterValues}
      onReset={handleReset}
      setFilteres={setFilteres}
    />
  );
};
