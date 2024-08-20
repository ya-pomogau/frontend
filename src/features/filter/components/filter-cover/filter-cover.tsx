import { FormEvent, ReactElement, useEffect } from 'react';

import { Tooltip } from 'shared/ui/tooltip';
import { Button } from 'shared/ui/button';

import { SortByBlock } from 'features/filter/ui/sortBy-block';
import { RadiusBlock } from 'features/filter/ui/radius-block';
import { CalenderBlock } from 'features/filter/ui/calender-block';
import { UserCategoriesBlock } from 'features/filter/ui/userCategories-block';
import { TimeBlock } from 'features/filter/ui/time-block';
import { CategoriesBlock } from 'features/filter/ui/categories-block';

import type { IFilterValues } from 'features/filter/types';

import styles from './filter-cover.module.css';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { defaultObjFilteres } from 'features/filter/consts';
import { useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

interface FilterCoverProps {
  closeFilterMenu: () => void;
  position: { top: number; right: number };
  // filterMenu: ReactElement;
  filterMenu: { [key in keyof IFilterValues]?: boolean } | undefined;
  // filterValues: IFilterValues;
  setFilteres?: (item: IFilterValues) => void;
  // onReset: () => void;
}

export const FilterCover = ({
  closeFilterMenu,
  position,
  filterMenu,
  setFilteres,
}: // filterValues,
// onReset,
FilterCoverProps) => {
  const [_, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams();

  const defaultValues: IFilterValues = {
    categories: [],
    searchRadius: '',
    sortBy: '',
    date: '',
    time: [],
    userCategories: [],
  };

  // const { control, handleSubmit, reset, watch } = useForm<IFilterValues>({
  const { control, reset, watch } = useForm<IFilterValues>({
    defaultValues,
  });

  const onSubmit = (data: IFilterValues) => {
    if (setFilteres) {
      setFilteres(data);
    }
  };

  const filterValues = watch();

  // filterValues={formValues}

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
    // onReset();
    reset(defaultValues);
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

  const items = filterMenu;

  const element: ReactElement = (
    <>
      {items?.sortBy && (
        <Controller
          name="sortBy"
          control={control}
          render={({ field }) => (
            <SortByBlock filter={field.value} onChange={field.onChange} />
          )}
        />
      )}
      {items?.categories && (
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <CategoriesBlock
              selectedServies={field.value}
              onChange={field.onChange}
            />
          )}
        />
      )}
      {items?.userCategories && (
        <Controller
          name="userCategories"
          control={control}
          render={({ field }) => (
            <UserCategoriesBlock
              filter={field.value}
              onChange={field.onChange}
            />
          )}
        />
      )}
      {items?.searchRadius && (
        <Controller
          name="searchRadius"
          control={control}
          render={({ field }) => (
            <RadiusBlock filter={field.value} onChange={field.onChange} />
          )}
        />
      )}
      <div className={styles.dateBlock}>
        {items?.time && (
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <TimeBlock filterTime={field.value} onChange={field.onChange} />
            )}
          />
        )}
        {items?.date && (
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <CalenderBlock
                filterDate={field.value}
                onChange={field.onChange}
              />
            )}
          />
        )}
      </div>
    </>
  );

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
          {element}
          <div
            className={`${styles.buttonWrapper} ${
              window.innerWidth <= 768 ? styles.buttonWrapper__mobile : null
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
