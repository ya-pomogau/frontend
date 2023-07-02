import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tooltip } from "shared/ui/tooltip";
import { Button } from "shared/ui/button";
import { RecipientFilter } from "./recipient-filter";
import { AdminFilter } from "./admin-filter";
import { IFilterValues, TRole } from "./types";
import { VolunteerFilter } from "./volunteer-filter";
import { formatDate, getQuery } from "../libs";
import styles from "./styles.module.css";

interface TasksFilterProps {
  userRole: TRole;
  visible: boolean;
  changeVisible: () => void;
}

export const TasksFilter = ({ userRole, visible, changeVisible }: TasksFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValues, setFilterValues] = useState<IFilterValues>({
    showByDate: false,
    categories: [],
    date: "",
    searchRadius: '',
    sortBy: ''
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
    let params = "?";
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        params +=
          Array.isArray(value) && value.length ? `${key}=${value}&` : "";
      }
      if (key === 'date' && value.length) {
        const index = value.indexOf('T');
        params += `${key}=${value.slice(0, index)}&`;
      }
      if ((key === 'searchRadius' || 'sortBy' && value.length) || 
        (key === 'showByDate' && value === true)) {
        params += `${key}=${value}&`;
      }
    });

    setSearchParams(params);
    changeVisible();
  };
  useEffect(() => {
    // получение query-параметров в виде объекта
    const queryParams = getQuery(searchParams);
    // получение искомой даты из query-параметров
    const dateFromQuery = queryParams?.date as string;
    // получение текущей даты (без времени внутри суток)
    function getNewDate() {
      const newDate = new Date();
      return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    }
    setFilterValues({
      ...filterValues,
      ...queryParams,
      date:
        userRole === "volunteer" ? dateFromQuery || formatDate(getNewDate()) : "",
    });
  }, []);

  return (
    <Tooltip
      pointerPosition="right"
      visible={visible}
      extClassName={styles.tooltip}
      changeVisible={changeVisible}
    >
      <div className={styles.wrapper}>
        {userRole === "admin" && (
          <AdminFilter
            filter={filterValues.categories}
            onChange={handleFilterChange}
          />
        )}
        {userRole === "recipient" && (
          <RecipientFilter
            filter={filterValues}
            onChange={handleFilterChange}
          />
        )}

        {userRole === "volunteer" && filterValues.date && (
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
            onClick={handleAcceptClick}
          />
        </div>
      </div>
    </Tooltip>
  );
};
