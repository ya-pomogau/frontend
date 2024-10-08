import { ReactElement } from 'react';

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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  emptyFilterData,
  filterDataSelector,
  resetFilterData,
  setFilterData,
} from '../../model';

interface FilterCoverProps {
  filterMenu: FilterProps['items'];
  closeFilterMenu: () => void;
  position: { top: number; right: number };
}

export const FilterCover = ({
  filterMenu,
  closeFilterMenu,
  position,
}: FilterCoverProps) => {
  const isMobile = useMediaQuery(Breakpoints.L);

  const dispatch = useAppDispatch();

  const currentFilterData = useAppSelector(filterDataSelector);

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
          ret.values[item] = currentFilterData[item];
          ret.components[item] = defaultValues[item].component;
        }
      });
    return ret;
  };

  const { values, components } = getDefaultValues(filterMenu);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<Partial<IFilterValues>>({ values });

  const onSubmit: SubmitHandler<Partial<IFilterValues>> = (data) => {
    dispatch(
      setFilterData({
        ...emptyFilterData,
        ...data,
      })
    );
    closeFilterMenu();
  };

  const resetFilter = () => {
    reset(values);
    dispatch(resetFilterData());
    closeFilterMenu();
  };

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
              extClassName={styles.buttonStyle}
              label="Сбросить фильтры"
              buttonType="secondary"
              size="medium"
              actionType="reset"
              customIcon={<CloseCrossIcon color={'blue'} />}
            />
            <Button
              extClassName={styles.buttonStyle}
              label="Применить"
              buttonType="primary"
              size="medium"
              actionType="submit"
              disabled={!isDirty}
            />
          </div>
        </div>
      </form>
    </Tooltip>
  );
};
