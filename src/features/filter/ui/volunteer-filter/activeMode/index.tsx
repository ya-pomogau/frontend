import { SortByBlock } from '../../sortBy-block';
import { CategoriesBlock } from '../../categories-block';
import { RadiusBlock } from '../../radius-block';
import type { TVolunteerFilter } from '../../types';

interface ActiveModeProps {
  filter: TVolunteerFilter;
  onChange: (name: string, value: string[] | string) => void;
  modeOfProfile: string;
}

export const ActiveMode = ({
  filter,
  onChange,
  modeOfProfile,
}: ActiveModeProps) => (
  <>
    <SortByBlock
      filter={filter.sortBy}
      onChange={onChange}
      userRole="volunteer"
    />
    <CategoriesBlock
      selectedCategories={filter.categories}
      onChange={onChange}
    />
    <RadiusBlock
      filter={filter.searchRadius}
      onChange={onChange}
      modeOfProfile={modeOfProfile}
    />
  </>
);
