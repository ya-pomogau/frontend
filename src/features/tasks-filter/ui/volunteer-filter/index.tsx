import classnames from "classnames";
import { ChangeEvent } from "react";
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
  const handleDateChange = (date: Date) => {
    const formatedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss");
    onChange("date", formatedDate);
  };

  const getRadiusButtonType = (id: string) =>
    filter.searchRadius.includes(id) ? "primary" : "secondary";

  const handleRadiusButtonClick = (id: string) => {
    let newValue;
    if (filter.searchRadius.includes(id)) {
      newValue = filter.searchRadius.filter((item) => item !== id);
    } else {
      newValue = [...filter.searchRadius, id];
    }
    onChange("searchRadius", newValue);
  };

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
            isMobile={false}
            onChangeValue={handleDateChange}
          />
        </div>
      </div>
    </>
  );
};
