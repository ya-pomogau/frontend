import { FilterWrapper } from 'features/filter/components/filter-wrapper';
import { FilterProps } from 'features/filter/types';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { resetFilterData } from './model';

export const Filter = ({
  items,
  notFoundFilter = false,
  setFilteres,
}: FilterProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFilterData());
    };
  }, []);

  if (notFoundFilter) {
    return null;
  }

  return <FilterWrapper filterMenu={items} setFilteres={setFilteres} />;
};
