import { useEffect, ReactElement, Dispatch, SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Tooltip } from 'shared/ui/tooltip';
import { Button } from 'shared/ui/button';
import { getQuery } from '../../libs';

import type { IFilterValues } from 'features/filter/types';

import styles from './filter-cover.module.css';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';

interface FilterCoverProps {
  closeFilterMenu: () => void;
  position: { top: number; right: number };
  filterMenu: ReactElement;
  filterValues: IFilterValues;
  setFilterValues: Dispatch<SetStateAction<IFilterValues>>;
}

export const FilterCover = ({
  closeFilterMenu,
  position,
  filterMenu,
  filterValues,
  setFilterValues,
}: FilterCoverProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParams = getQuery(searchParams);

    if (window.innerWidth > 768) {
      setFilterValues({
        ...filterValues,
        ...queryParams,
      });
    } else {
      setTimeout(() => {
        setFilterValues({
          ...filterValues,
          ...queryParams,
        });
      }, 0);
    }
  }, []);

  const applyFilter = () => {
    let params = `?`;

    Object.entries(filterValues).forEach(([key, value]) => {
      if (value.length) {
        params += `${key}=${value}&`;
      }
    });

    setSearchParams(params);
    console.log(filterValues);
    closeFilterMenu();
  };

  const resetFilter = () => {};

  const filterPositionStyles = {
    top: `${position.top}px`,
    right: `${window.innerWidth - position.right - 10}px`,
  };

  return (
    <Tooltip
      pointerPosition="right"
      changeVisible={closeFilterMenu}
      elementStyles={filterPositionStyles}
      extClassName={styles.tooltip}
      visible
    >
      <form name="formFilter">
        <div className={styles.wrapper}>
          {filterMenu}
          <div
            className={`${styles.buttonWrapper} ${
              window.innerWidth <= 768 ? styles.buttonWrapper__mobile : null
            }`}
          >
            <Button
              label="Сбросить фильтры"
              buttonType="secondary"
              size="medium"
              actionType="button"
              customIcon={<CloseCrossIcon color={'blue'} />}
              onClick={resetFilter}
            />
            <Button
              onClick={applyFilter}
              label="Применить"
              buttonType="primary"
              size="medium"
              actionType="button"
            />
          </div>
        </div>
      </form>
    </Tooltip>
  );
};
