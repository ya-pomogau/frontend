import { FilterWrapper } from 'features/filter/components/filter-wrapper';
import { FilterProps } from 'features/filter/types';

export const Filter = ({
  items,
  notFoundFilter = false,
  setFilteres,
}: FilterProps) => {
  if (notFoundFilter) {
    return null;
  }

  return <FilterWrapper filterMenu={items} setFilteres={setFilteres} />;
};
