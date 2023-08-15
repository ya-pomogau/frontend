import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';

import { FilterWrapper } from 'features/filter/components/filter-wrapper';
import { IAdminsTasksFilterValues, IFilterValues } from 'features/filter/types';
import { UserCategoriesBlock } from 'features/filter/ui/userCategories-block';
import { SortByBlock } from 'features/filter/ui/sortBy-block';
import { CategoriesBlock } from 'features/filter/ui/categories-block';

export const AdminsTasksFilter = () => {
  const { role } = useAppSelector((state) => state.user);
  const { recipientId } = useParams();

  const [filterValues, setFilterValues] = useState<IAdminsTasksFilterValues>({
    categories: [],
    sortBy: '',
  });

  const handleFilterChange = (
    name: string,
    value: string | string[] | boolean
  ) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  const setFilterState = (value: IFilterValues) => {
    setFilterValues(value as IAdminsTasksFilterValues);
  };

  if (role === 'admin') {
    if (recipientId) {
      return (
        <UserCategoriesBlock
          filter={filterValues.categories}
          onChange={handleFilterChange}
        />
      );
    }

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
