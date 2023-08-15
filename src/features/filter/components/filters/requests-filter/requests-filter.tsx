import { useState } from 'react';

import { useAppSelector } from 'app/hooks';

import { FilterWrapper } from 'features/filter/components/filter-wrapper';
import { IFilterValues, IRequestsFilterValues } from 'features/filter/types';
import { UserCategoriesBlock } from 'features/filter/ui/userCategories-block';

export const RequestsFilter = () => {
  const { role } = useAppSelector((state) => state.user);

  const [filterValues, setFilterValues] = useState<IRequestsFilterValues>({
    categories: [],
  });

  const handleFilterChange = (
    name: string,
    value: string | string[] | boolean
  ) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  const setFilterState = (value: IFilterValues) => {
    setFilterValues(value as IRequestsFilterValues);
  };

  if (role === 'admin') {
    return (
      <FilterWrapper
        filterMenu={
          <>
            <UserCategoriesBlock
              filter={filterValues.categories}
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
