import { ReactElement, Ref, useEffect } from 'react';
import { useEffect, ReactElement, FormEvent } from 'react';

import { Tooltip } from 'shared/ui/tooltip';
import { Button } from 'shared/ui/button';

import { useMediaQuery } from 'shared/hooks';
import { Breakpoints } from 'shared/config';

import { SortByBlock } from 'features/filter/ui/sortBy-block';
import { RadiusBlock } from 'features/filter/ui/radius-block';
import { CalenderBlock } from 'features/filter/ui/calender-block';
import { UserCategoriesBlock } from 'features/filter/ui/userCategories-block';
import { TimeBlock } from 'features/filter/ui/time-block';
import { CategoriesBlock } from 'features/filter/ui/categories-block';

import type { FilterProps, IFilterValues } from 'features/filter/types';

import styles from './filter-cover.module.css';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { defaultObjFilteres } from 'features/filter/consts';
import { useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { userSelector } from '../../../../services';
// import { setFilterData } from '../../../../services/system-slice';

interface FilterCoverProps {
  filterMenu: FilterProps['items'];
  closeFilterMenu: () => void;
  position: { top: number; right: number };
  setFilteres?: (item: IFilterValues) => void;
}

export const FilterCover = ({
  filterMenu,
  setFilteres,
  closeFilterMenu,
  position,
}: FilterCoverProps) => {
  const [_, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams();
  const isMobile = useMediaQuery(Breakpoints.L);

  const dispatch = useAppDispatch();

  // const someFilterData = useAppSelector(filterDataSelector);

  const defaultValues = {
    categories: { value: [], component: CategoriesBlock },
    searchRadius: { value: '', component: RadiusBlock },
    sortBy: { value: '', component: SortByBlock },
    date: { value: '', component: CalenderBlock },
    time: { value: [], component: TimeBlock },
    userCategories: { value: [], component: UserCategoriesBlock },
  };

  const getDefaultValues = (filterParams: FilterProps['items']) => {
    const ret: {
      values: Partial<IFilterValues>;
      components: {
        [key in keyof Partial<IFilterValues>]?: ReactElement;
      };
    } = {
      values: {},
      components: {},
    };
    if (filterParams)
      Object.keys(filterParams).map((item) => {
        if (filterParams[item]) {
          ret.values[item] = defaultValues[item].value;
          // ret.values[item] = someFilterData[item];
          ret.components[item] = defaultValues[item].component;
        }
      });
    return ret;
  };

  const { values, components } = getDefaultValues(filterMenu);

  const { control, handleSubmit, reset, watch } = useForm<
    Partial<IFilterValues>
  >({
    values,
  });

  const filterValues = watch();

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
    let zzz = {
      categories: [],
      searchRadius: '',
      sortBy: '',
      date: '',
      time: [],
      userCategories: [],
    };
    zzz = { ...zzz, ...filterValues };
    // dispatch(setFilterData(zzz));
    closeFilterMenu();
  };

  const onSubmit = () => applyFilter();

  const resetFilter = () => {
    reset(values);
    const zzz = {
      categories: [],
      searchRadius: '',
      sortBy: '',
      date: '',
      time: [],
      userCategories: [],
    };
    // dispatch(setFilterData(zzz));
    setSearchParams(defaultObjFilteres);
    setFilteres?.(defaultObjFilteres);
    closeFilterMenu();
  };

  const filterPositionStyles = {
    top: `${position.top}px`,
    right: `${window.innerWidth - position.right - 10}px`,
  };

  const isFilterSelected = () => {
    let ret = false;
    Object.keys(filterValues).forEach((category) => {
      if (filterValues[category].length > 0) ret = true;
    });
    return ret;
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
        onSubmit={handleSubmit(onSubmit)}
        onReset={resetFilter}
      >
        <div className={styles.wrapper}>
          {Object.keys(components).map((name, i) => (
            <Controller
              key={i}
              name={name as keyof IFilterValues}
              control={control}
              render={({ field }) => {
                const Component = components[name as keyof IFilterValues];
                return (
                  <Component onChange={field.onChange} value={field.value} />
                );
              }}
            />
          ))}
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
