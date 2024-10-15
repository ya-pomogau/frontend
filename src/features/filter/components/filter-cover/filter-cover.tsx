import { Tooltip } from 'shared/ui/tooltip';
import { Button } from 'shared/ui/button';

import { useMediaQuery } from 'shared/hooks';
import { Breakpoints } from 'shared/config';

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
import { getDefaultValues } from '../../../../shared/libs/utils';

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

  const { values, components } = getDefaultValues(filterMenu);

  (Object.keys(values) as (keyof Partial<IFilterValues>)[]).map((item) => {
    values[item] = currentFilterData[item] as string & string[];
  });

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
                  <Component
                    onChange={field.onChange}
                    value={field.value as string & string[]}
                  />
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
