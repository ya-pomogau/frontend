import { useEffect, ReactElement, FormEvent } from 'react';

import { Tooltip } from 'shared/ui/tooltip';
import { Button } from 'shared/ui/button';

import { useMediaQuery } from 'shared/hooks';
import { Breakpoints } from 'shared/config';

import type { IFilterValues } from 'features/filter/types';

import styles from './filter-cover.module.css';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { defaultObjFilteres } from 'features/filter/consts';
import { useSearchParams } from 'react-router-dom';

interface FilterCoverProps {
  closeFilterMenu: () => void;
  position: { top: number; right: number };
  filterMenu: ReactElement;
  filterValues: IFilterValues;
  setFilteres?: (item: IFilterValues) => void;
  onReset: () => void;
}

export const FilterCover = ({
  closeFilterMenu,
  position,
  filterMenu,
  filterValues,
  onReset,
  setFilteres,
}: FilterCoverProps) => {
  const [_, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams();
  const isMobile = useMediaQuery(Breakpoints.L);

  useEffect(() => {
    if (!isMobile) {
      setFilteres?.({
        ...filterValues,
      });
    } else {
      setTimeout(() => {
        setFilteres?.({
          ...filterValues,
        });
      }, 0);
    }
    // eslint-disable-next-line
  }, []);

  const buttonStyle = { marginTop: '-15px' };

  const applyFilter = () => {
    Object.entries(filterValues).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value[0] !== '00:00' && value[1] !== '00:00' && value.length > 0) {
          newSearchParams.set(key, value.toString());
        }
      }

      if (typeof value === 'string' && value.length > 0) {
        newSearchParams.set(key, value);
      }
    });
    setSearchParams(newSearchParams);
    setFilteres?.(filterValues);
    closeFilterMenu();
  };

  const resetFilter = () => {
    onReset();
    setSearchParams(defaultObjFilteres);
    setFilteres?.(defaultObjFilteres);
    closeFilterMenu();
  };

  const filterPositionStyles = {
    top: `${position.top}px`,
    right: `${window.innerWidth - position.right - 10}px`,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyFilter();
  };

  const isFilterSelected = () => {
    return (
      filterValues.categories.length > 0 ||
      filterValues.searchRadius.length > 0 ||
      filterValues.sortBy.length > 0 ||
      filterValues.date.length > 0 ||
      filterValues.time.length > 0 ||
      filterValues.userCategories.length > 0
    );
  };
  return (
    <Tooltip
      pointerPosition="right"
      changeVisible={closeFilterMenu}
      elementStyles={filterPositionStyles}
      extClassName={styles.tooltip}
      visible
    >
      <form name="formFilter" onSubmit={handleSubmit} onReset={resetFilter}>
        <div className={styles.wrapper}>
          {filterMenu}
          <div
            className={`${styles.buttonWrapper} ${
              isMobile ? styles.buttonWrapper__mobile : null
            }`}
          >
            <Button
              style={buttonStyle}
              label="Сбросить фильтры"
              buttonType="secondary"
              size="medium"
              actionType="reset"
              customIcon={<CloseCrossIcon color={'blue'} />}
            />
            <Button
              style={buttonStyle}
              label="Применить"
              buttonType="primary"
              size="medium"
              actionType="submit"
              disabled={!isFilterSelected()}
            />
          </div>
        </div>
      </form>
    </Tooltip>
  );
};
