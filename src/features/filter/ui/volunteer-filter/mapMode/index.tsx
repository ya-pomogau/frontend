import { CategoriesBlock } from '../../categories-block';
import { TVolunteerFilter } from '../../types';
import { RadiusBlock } from '../../radius-block';
import { CalenderBlock } from '../../calender-block/index';

interface MapModeProps {
  filter: TVolunteerFilter;
  onChange: (name: string, value: string[] | string) => void;
  modeOfProfile: string;
}

export const MapMode = ({ filter, onChange, modeOfProfile }: MapModeProps) => (
  <>
    <CategoriesBlock
      selectedCategories={filter.categories}
      onChange={onChange}
    />
    <RadiusBlock
      filter={filter.searchRadius}
      onChange={onChange}
      modeOfProfile={modeOfProfile}
    />
    <CalenderBlock filterDate={filter.date} onChange={onChange} />
  </>
);
