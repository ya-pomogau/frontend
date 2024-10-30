import { ChangeEvent } from 'react';

import Fieldset from 'shared/ui/fieldset';
import { fieldsetView } from 'shared/ui/fieldset/utils';
import Checkbox from 'shared/ui/checkbox';
import { variantCheckbox } from 'shared/types/common.types';

interface SortByBlockProps {
  filter: string;
  onChange: (value: string) => void; // Обновляем типизацию
}

export const SortByBlock = ({ filter, onChange }: SortByBlockProps) => {
  const handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const newValue = target.checked ? target.id : '';
    onChange(newValue); // Упрощаем вызов
  };

  return (
    <Fieldset title="Отображать" view={fieldsetView.COLUMN}>
      <Checkbox
        checked={filter === variantCheckbox.DATE}
        id={variantCheckbox.DATE}
        label="По дате"
        onChange={handleCheckboxChange}
      />
      {/* Закоментили, так как так и не определились нужны ли у волонтера в фильтрах другие параметры кроме даты */}
      {/* {role === userRole.VOLUNTEER && (
        <>
          <Checkbox
            checked={filter === variantCheckbox.DECREASINGPOINTS}
            id={variantCheckbox.DECREASINGPOINTS}
            label="По убывающим баллам"
            onChange={handleCheckboxChange}
          />

          <Checkbox
            checked={filter === variantCheckbox.INCREASINGPOINTS}
            id={variantCheckbox.INCREASINGPOINTS}
            label="По возростающим баллам"
            onChange={handleCheckboxChange}
          />
        </>
      )} */}
    </Fieldset>
  );
};
