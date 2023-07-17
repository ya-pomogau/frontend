import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Tooltip } from 'shared/ui/tooltip';
import { Button } from 'shared/ui/button';
import { RecipientFilter } from './recipient-filter';
import { AdminFilter } from './admin-filter';
import { VolunteerFilter } from './volunteer-filter';
import { getQuery } from '../libs';
import type { IFilterValues, TRole } from './types';

import styles from './styles.module.css';

interface FilterProps {
  userRole: TRole;
  visible?: boolean;
  changeVisible: () => void;
  position: { top: number; right: number };
}

export const Filter = ({
  userRole,
  visible = true,
  changeVisible,
  position,
}: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValues, setFilterValues] = useState<IFilterValues>({
    categories: [],
    date: '',
    searchRadius: '',
    sortBy: '',
  });
  const [filterPosition, setFilterPosition] = useState({
    top: '0px',
    right: '0px',
  });

  // сохранение выбранных параметров фильтра
  const handleFilterChange = (
    name: string,
    value: string | string[] | boolean
  ) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  // обработка выбора параметров фильтра: сохранение выбора в адресную строку и закрытие фильтра
  const handleAcceptClick = () => {
    let params = '?';
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value.length) {
        params += `${key}=${value}&`;
      }
    });
    setSearchParams(params);
    changeVisible();
  };
  const setPosition = useCallback(
    () =>
      setFilterPosition({
        top: `${position.top}px`,
        right: `${window.innerWidth - position.right - 10}px`,
      }),
    [position.top, position.right]
  );
  useMemo(() => {
    setPosition();
  }, [setPosition]);

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
      });
    }
  }, []);

  return (
    <Tooltip
      pointerPosition="right"
      visible={visible}
      extClassName={styles.tooltip}
      changeVisible={changeVisible}
      elementStyles={filterPosition}
    >
      <form name="formFilter">
        <div className={styles.wrapper}>
          {userRole === 'admin' && (
            <AdminFilter filter={filterValues} onChange={handleFilterChange} />
          )}
          {userRole === 'recipient' && (
            <RecipientFilter
              filter={filterValues}
              onChange={handleFilterChange}
            />
          )}
          {userRole === 'volunteer' && (
            <VolunteerFilter
              filter={filterValues}
              onChange={handleFilterChange}
            />
          )}
          <div className={styles.buttonWrapper}>
            <Button
              label="Применить"
              buttonType="primary"
              size="medium"
              actionType="button"
              onClick={handleAcceptClick}
            />
          </div>
        </div>
      </form>
    </Tooltip>
  );
};
