import { useRef, ChangeEvent } from 'react';
import classnames from 'classnames';

import Checkbox from 'shared/ui/checkbox';
import { FilterItemsIds } from '../../consts';

import styles from '../styles.module.css';
import usePermission from 'shared/hooks/use-permission';
import { UserRole, UserStatus } from 'shared/types/common.types';
import { useAppSelector } from 'app/hooks';
import { useGetCategoriesQuery } from 'services/categories-api';

interface CategoriesBlockProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const CategoriesBlock = ({ value, onChange }: CategoriesBlockProps) => {
  const categoriesBlockRef = useRef<HTMLDivElement>(null);

  const categories = useGetCategoriesQuery().currentData;

  const volunteerMainGuard = usePermission(
    [UserStatus.CONFIRMED, UserStatus.VERIFIED, UserStatus.ACTIVATED],
    UserRole.VOLUNTEER
  );

  const volunteerHigherGuard = usePermission(
    [UserStatus.CONFIRMED, UserStatus.VERIFIED],
    UserRole.VOLUNTEER
  );
  const volunteerSpecialGuard = usePermission(
    [UserStatus.CONFIRMED],
    UserRole.VOLUNTEER
  );

  const userRole = useAppSelector((state) => state.user.data?.role);
  const isVolunteer = userRole === 'Volunteer';

  const handleCheckboxChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    let newValue: string[];

    if (target.checked) {
      newValue = [...value, target.id];
    } else {
      newValue = value.filter((item) => item !== target.id);
    }
    onChange(newValue);
  };

  const checkAccess = (category: string) => {
    if (
      category === FilterItemsIds.SERVIS_1 ||
      category === FilterItemsIds.SERVIS_3 ||
      category === FilterItemsIds.SERVIS_5
    ) {
      return !volunteerSpecialGuard;
    }

    if (
      category === FilterItemsIds.SERVIS_2 ||
      category === FilterItemsIds.SERVIS_4 ||
      category === FilterItemsIds.SERVIS_8
    ) {
      return !volunteerHigherGuard;
    }

    if (
      category === FilterItemsIds.SERVIS_6 ||
      category === FilterItemsIds.SERVIS_7 ||
      category === FilterItemsIds.SERVIS_9
    ) {
      return !volunteerMainGuard;
    }
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
          {categories?.map((category) => (
            <Checkbox
              key={category._id}
              name="taskCategory"
              label={category.title}
              checked={value.includes(category.title)}
              id={category.title}
              onChange={handleCheckboxChange}
              disabled={(isVolunteer && checkAccess(category.title)) || false}
              extClassName={classnames('text_size_small')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
