import { ChangeEvent } from 'react';

import Fieldset from 'shared/ui/fieldset';
import { FieldsetView } from 'shared/ui/fieldset/utils';
import Checkbox from 'shared/ui/checkbox';
import { useAppSelector } from 'app/hooks';
import { UserRole } from 'shared/types/common.types';

interface SortByBlockProps {
  filter: string;
  onChange: (name: string, value: string[] | string) => void;
}

export const SortByBlock = ({ filter, onChange }: SortByBlockProps) => {
  const { role } = useAppSelector((state) => state.user);

  const handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange('sortBy', target.id);
  };

  return (
    <Fieldset title="Отображать" view={FieldsetView.COLUMN}>
      <Checkbox
        checked={filter === 'date'}
        id="date"
        label="По дате"
        onChange={handleCheckboxChange}
      />

      {role === UserRole.VOLUNTEER && (
        <>
          <Checkbox
            checked={filter === 'decreasingPoints'}
            id="decreasingPoints"
            label="По убывающим баллам"
            onChange={handleCheckboxChange}
          />

          <Checkbox
            checked={filter === 'increasingPoints'}
            id="increasingPoints"
            label="По возростающим баллам"
            onChange={handleCheckboxChange}
          />
        </>
      )}
    </Fieldset>
  );
};
