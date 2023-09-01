import { ChangeEvent } from 'react';
import classnames from 'classnames';

import Checkbox from 'shared/ui/checkbox';
import { FilterItemsIds } from '../../consts';

import styles from '../styles.module.css';

interface UserCategoriesBlockProps {
  filter: string[];
  onChange: (name: string, value: string[]) => void;
}

export const UserCategoriesBlock = ({
  filter,
  onChange,
}: UserCategoriesBlockProps) => {
  const handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      const newValue = [target.id];
      onChange('categories', newValue);
    }
  };

  return (
    <div className={styles.filterBlock}>
      <div
        className={classnames(
          styles.filterBlockTitle,
          'text',
          'text_size_small',
          'text_type_bold'
        )}
      >
        Категория
      </div>

      <div className={styles.checkboxesWrapper}>
        <Checkbox
          label="Все"
          checked={filter.includes(FilterItemsIds.ALL)}
          id={FilterItemsIds.ALL}
          onChange={handleCheckboxChange}
        />

        <Checkbox
          label="Волонтеры"
          checked={filter.includes(FilterItemsIds.VOLUNTEER)}
          id={FilterItemsIds.VOLUNTEER}
          onChange={handleCheckboxChange}
        />

        <Checkbox
          label="Реципиенты"
          checked={filter.includes(FilterItemsIds.RECIPIENT)}
          id={FilterItemsIds.RECIPIENT}
          onChange={handleCheckboxChange}
        />

        <Checkbox
          label="Не обработанные"
          checked={filter.includes(FilterItemsIds.UNHANDLED)}
          id={FilterItemsIds.UNHANDLED}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};
