import { useEffect, useState } from "react";
import classnames from "classnames";
import { format, parseISO } from "date-fns";
import { DatePicker } from "shared/ui/date-picker";
import { Button } from "shared/ui/button";
import { CategoriesBlock } from "../categories-block";
import styles from "../styles.module.css";
import { TVolunteerFilter } from "../types";
import { FilterItemsIds } from "../consts";

interface Props {
  filter: TVolunteerFilter;
  onChange: (name: string, value: string[] | string) => void;
}

export const VolunteerFilter = ({ filter, onChange }: Props) => {
  const [isCalenderMobil, setIsCalenderMobil] = useState(false);

  if (filter.searchRadius === '') {
    filter.searchRadius = '5';
  }
  const handleDateChange = (date: Date) => {
    const formatedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
    onChange("date", formatedDate);
  };

  const getRadiusButtonType = (id: string) =>
    filter.searchRadius.includes(id) ? "primary" : "secondary";

  const handleRadiusButtonClick = (id: string) => {
    onChange("searchRadius", id);
  };

  // определение того, в каком виде должен быть календарь: десктопном или мобильном, в том числе
  // для случаев, когда изменение размера экрана происходит из-за изменения размера браузера
  const setTypeCalender = () => {
    if (window.innerWidth <= 768) {
      setIsCalenderMobil(true);
    } else {
      setIsCalenderMobil(false);
    }
  };
  useEffect(() => {
    setTypeCalender();
    window.addEventListener('resize', setTypeCalender);
    return () => {window.removeEventListener('resize', setTypeCalender)};
  }, []);

  return (
    <>
      <CategoriesBlock filter={filter.categories} onChange={onChange} />

      <div className={styles.filterBlock}>
        <div
          className={classnames(
            styles.filterBlockTitle,
            "text",
            "text_size_small",
            "text_type_bold"
          )}
        >
          Радиус поиска
        </div>
        <div className={styles.radiusButtonsWrapper}>
          <Button
            buttonType={getRadiusButtonType(FilterItemsIds.RADIUS_1)}
            size="medium"
            label="1 км"
            extClassName={styles.radiusButton}
            id={FilterItemsIds.RADIUS_1}
            onClick={() => handleRadiusButtonClick("1")}
          />
          <Button
            buttonType={getRadiusButtonType(FilterItemsIds.RADIUS_3)}
            size="medium"
            label="3 км"
            extClassName={styles.radiusButton}
            id={FilterItemsIds.RADIUS_3}
            onClick={() => handleRadiusButtonClick("3")}
          />
          <Button
            buttonType={getRadiusButtonType(FilterItemsIds.RADIUS_5)}
            size="medium"
            label="5 км"
            extClassName={styles.radiusButton}
            id={FilterItemsIds.RADIUS_5}
            onClick={() => handleRadiusButtonClick("5")}
          />
        </div>
      </div>

      <div className={styles.filterBlock}>
        <div
          className={classnames(
            styles.filterBlockTitle,
            "text",
            "text_size_small",
            "text_type_bold"
          )}
        >
          Дата и время
        </div>
        <div>
          <DatePicker
            value={parseISO(filter.date)}
            isMobile={isCalenderMobil}
            onChangeValue={handleDateChange}
          />
        </div>
      </div>
    </>
  );
};
