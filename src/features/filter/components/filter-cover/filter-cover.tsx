import { useEffect, ReactElement, FormEvent } from 'react';

import { Tooltip } from 'shared/ui/tooltip';
import { Button } from 'shared/ui/button';

import type { IFilterValues } from 'features/filter/types';

import styles from './filter-cover.module.css';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { defaultObjFilteres } from 'features/filter/consts';

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
  useEffect(() => {
    if (window.innerWidth > 768) {
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

  const applyFilter = () => {
    setFilteres?.(filterValues);
    closeFilterMenu();
  };

  const resetFilter = () => {
    onReset();
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

  return (
    <Tooltip
      pointerPosition="right"
      changeVisible={closeFilterMenu}
      elementStyles={filterPositionStyles}
      extClassName={styles.tooltip}
      visible
    >
      <form
        name="formFilter"
        onSubmit={(e) => handleSubmit(e)}
        onReset={() => resetFilter()}
      >
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
              actionType="reset"
              customIcon={<CloseCrossIcon color={'blue'} />}
            />
            <Button
              label="Применить"
              buttonType="primary"
              size="medium"
              actionType="submit"
            />
          </div>
        </div>
      </form>
    </Tooltip>
  );
};
