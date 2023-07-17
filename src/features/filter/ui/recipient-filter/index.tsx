import { CategoriesBlock } from '../categories-block';
import { SortByBlock } from '../sortBy-block';
import type { TRecipientFilter } from '../types';

interface RecipientFilterProps {
  filter: TRecipientFilter;
  onChange: (name: string, value: string[] | string) => void;
}

export const RecipientFilter = ({ filter, onChange }: RecipientFilterProps) => (
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
