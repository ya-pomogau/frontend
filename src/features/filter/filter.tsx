import { FilterWrapper } from 'features/filter/components/filter-wrapper';
import { FilterProps } from 'features/filter/types';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
// import { resetFilterData, setFilterData } from '../../services/system-slice';

export const Filter = ({
  items,
  notFoundFilter = false,
  setFilteres,
}: FilterProps) => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   return () => {
  //     console.log('ttt');
  //     const zzz = {
  //       categories: [],
  //       searchRadius: '',
  //       sortBy: '',
  //       date: '',
  //       time: [],
  //       userCategories: [],
  //     };
  //     // dispatch(setFilterData(zzz));
  //   };
  // }, []);

  if (notFoundFilter) {
    return null;
  }

  return <FilterWrapper filterMenu={items} setFilteres={setFilteres} />;
};
