import { ChangeEvent } from 'react';

import Fieldset from 'shared/ui/fieldset';
import { FieldsetView } from 'shared/ui/fieldset/utils';
import Checkbox from 'shared/ui/checkbox';
import { useAppSelector } from 'app/hooks';
import { VariantCheckbox } from 'shared/types/common.types';
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
        checked={filter === VariantCheckbox.DATE}
        id={VariantCheckbox.DATE}
        label="По дате"
        onChange={handleCheckboxChange}
      />

      {role === UserRole.VOLUNTEER && (
        <>
          <Checkbox
            checked={filter === VariantCheckbox.DECREASINGPOINTS}
            id={VariantCheckbox.DECREASINGPOINTS}
            label="По убывающим баллам"
            onChange={handleCheckboxChange}
          />

          <Checkbox
            checked={filter === VariantCheckbox.INCREASINGPOINTS}
            id={VariantCheckbox.INCREASINGPOINTS}
            label="По возростающим баллам"
            onChange={handleCheckboxChange}
          />
        </>
      )}
    </Fieldset>
  );
};
