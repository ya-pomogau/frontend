import { ChangeEvent } from 'react';

import Fieldset from 'shared/ui/fieldset';
import { FieldsetView } from 'shared/ui/fieldset/utils';
import Checkbox from 'shared/ui/checkbox';
import { VariantCheckbox } from 'shared/types/common.types';

interface SortByBlockProps {
  filter: string;
  onChange: (name: string, value: string[] | string) => void;
}

export const SortByBlock = ({ filter, onChange }: SortByBlockProps) => {

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
      {/* Закоментили, так как так и не определились нужны ли у волонтера в фильтрах другие параметры кроме даты */}
      {/* {role === UserRole.VOLUNTEER && (
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
      )} */}
    </Fieldset>
  );
};
