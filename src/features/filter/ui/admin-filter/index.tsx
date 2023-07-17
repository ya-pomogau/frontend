import { JSX } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { UserCategoriesBlock } from '../userCategories-block';
import { SortByBlock } from '../sortBy-block';
import { CategoriesBlock } from '../categories-block';
import type { IFilterValues } from '../types';

interface AdminFilterProps {
  filter: IFilterValues;
  onChange: (name: string, value: string | string[]) => void;
}

export const AdminFilter = ({ filter, onChange }: AdminFilterProps) => {
  // определяем текущий вариант профиля волонтёра по пути в URL
  const pathnameAsArray = useLocation().pathname.slice(1).split('/');
  const currentModeOfProfile =
    pathnameAsArray[pathnameAsArray.indexOf('admin') + 1];
  const params = useParams();

  let currentModeOfFilter: JSX.Element = <span>1</span>;
  switch (currentModeOfProfile) {
    case 'requests':
      currentModeOfFilter = (
        <UserCategoriesBlock filter={filter.categories} onChange={onChange} />
      );
      break;
    case 'tasks':
      if (!Object.keys(params).includes('recipientId')) {
        currentModeOfFilter = (
          <UserCategoriesBlock filter={filter.categories} onChange={onChange} />
        );
      } else {
        currentModeOfFilter = (
          <>
            <SortByBlock
              filter={filter.sortBy}
              onChange={onChange}
              userRole="recipient"
            />
            <CategoriesBlock
              selectedCategories={filter.categories}
              onChange={onChange}
            />
          </>
        );
      }
      break;
    default:
      currentModeOfFilter = (
        <span>Для такого вида профиля волонтёра нет подходящего фильтра</span>
      );
  }

  return currentModeOfFilter;
};
