import { useRef, ChangeEvent } from 'react';
import classnames from 'classnames';

import Checkbox from 'shared/ui/checkbox';
import { FilterItemsIds } from '../../consts';

import styles from '../styles.module.css';
import usePermission from 'shared/hooks/use-permission';
import { UserRole, UserStatus } from 'shared/types/common.types';

interface CategoriesBlockProps {
  selectedServies: string[];
  onChange: (name: string, value: string[]) => void;
}

export const CategoriesBlock = ({
  selectedServies,
  onChange,
}: CategoriesBlockProps) => {
  const categoriesBlockRef = useRef<HTMLDivElement>(null);

  const volunteerMainGuard = usePermission(
    [UserStatus.CONFIRMED, UserStatus.ACTIVATED, UserStatus.VERIFIED],
    UserRole.VOLUNTEER
  );

  const volunteerSpecialGuard = usePermission(
    [UserStatus.ACTIVATED, UserStatus.VERIFIED],
    UserRole.VOLUNTEER
  );
  const volunteerhigherGuard = usePermission(
    [UserStatus.VERIFIED],
    UserRole.VOLUNTEER
  );

  const handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    let newValue: string[];

    if (target.checked) {
      newValue = [...selectedServies, target.id];
    } else {
      newValue = selectedServies.filter((item) => item !== target.id);
    }
    onChange('categories', newValue);
  };

  return (
    <div className={styles.filterBlock} ref={categoriesBlockRef}>
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
        <div className={styles.row}>
          <Checkbox
            name="taskCategory"
            label="Сопровождение"
            checked={selectedServies.includes(FilterItemsIds.SERVIS_1)}
            id={FilterItemsIds.SERVIS_1}
            onChange={handleCheckboxChange}
            disabled={!volunteerMainGuard ?? false}
            extClassName={classnames('text_size_small')}
          />
          <Checkbox
            name="taskCategory"
            label="Перевозка в личном транспорте"
            checked={selectedServies.includes(FilterItemsIds.SERVIS_2)}
            id={FilterItemsIds.SERVIS_2}
            onChange={handleCheckboxChange}
            disabled={!volunteerMainGuard ?? false}
            extClassName={classnames('text_size_small')}
          />
        </div>
        <div className={styles.row}>
          <Checkbox
            name="taskCategory"
            label="Покупка продуктов"
            checked={selectedServies.includes(FilterItemsIds.SERVIS_3)}
            id={FilterItemsIds.SERVIS_3}
            onChange={handleCheckboxChange}
            disabled={!volunteerMainGuard ?? false}
            extClassName={classnames('text_size_small')}
          />
          <Checkbox
            name="taskCategory"
            label="Помощ в подъёме/спуске"
            checked={selectedServies.includes(FilterItemsIds.SERVIS_4)}
            id={FilterItemsIds.SERVIS_4}
            onChange={handleCheckboxChange}
            disabled={!volunteerSpecialGuard ?? false}
            extClassName={classnames('text_size_small')}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.box}>
            <Checkbox
              name="taskCategory"
              label="Покупка вещей/техники"
              checked={selectedServies.includes(FilterItemsIds.SERVIS_5)}
              id={FilterItemsIds.SERVIS_5}
              onChange={handleCheckboxChange}
              disabled={!volunteerSpecialGuard ?? false}
              extClassName={classnames('text_size_small')}
            />
          </div>
          <Checkbox
            name="taskCategory"
            label="Помощь в готовке"
            checked={selectedServies.includes(FilterItemsIds.SERVIS_6)}
            id={FilterItemsIds.SERVIS_6}
            onChange={handleCheckboxChange}
            disabled={!volunteerhigherGuard ?? false}
            extClassName={classnames('text_size_small')}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.box}>
            <Checkbox
              name="taskCategory"
              label="Помощь в уборке"
              checked={selectedServies.includes(FilterItemsIds.SERVIS_7)}
              id={FilterItemsIds.SERVIS_7}
              onChange={handleCheckboxChange}
              disabled={!volunteerSpecialGuard ?? false}
              extClassName={classnames('text_size_small')}
            />
          </div>
          <Checkbox
            name="taskCategory"
            label="Организация досуга"
            checked={selectedServies.includes(FilterItemsIds.SERVIS_8)}
            id={FilterItemsIds.SERVIS_8}
            onChange={handleCheckboxChange}
            disabled={!volunteerhigherGuard ?? false}
            extClassName={classnames('text_size_small')}
          />
        </div>
        <div className={styles.box}>
          <Checkbox
            name="taskCategory"
            label="Ремонт техники/жилья"
            checked={selectedServies.includes(FilterItemsIds.SERVIS_9)}
            id={FilterItemsIds.SERVIS_9}
            onChange={handleCheckboxChange}
            disabled={!volunteerSpecialGuard ?? false}
            extClassName={classnames('text_size_small')}
          />
        </div>
      </div>
    </div>
  );
};
