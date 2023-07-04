import { CategoriesBlock } from "../categories-block";
import { SortByBlock } from "../sortBy-block";
import { TRecipientFilter } from "../types";

interface Props {
  filter: TRecipientFilter;
  onChange: (name: string, value: string[] | string) => void;
}

export const RecipientFilter = ({ filter, onChange }: Props) => (
  <>
    <SortByBlock filter={filter.sortBy} onChange={onChange} userRole="recipient"/>
    <CategoriesBlock selectedCategories={filter.categories} onChange={onChange} />
  </>
);
