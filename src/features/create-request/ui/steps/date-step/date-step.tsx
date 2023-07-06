import React, { useMemo } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "app/hooks";
import moment from "moment";
import {
  addDate,
  addTime,
  changeCheckbox,
  changeStepIncrement,
} from "features/create-request/model";
import { Button } from "shared/ui/button";
import Checkbox from "shared/ui/checkbox";
import { DatePicker } from "shared/ui/date-picker";
import { formatDate } from "../../../libs/format-date";
import styles from "./date-step.module.css";

export const DateStep = () => {
  const { time, termlessRequest, date } = useAppSelector(
    (state) => state.createRequest
  );
  const dispatch = useAppDispatch();

  const handleDateValueChange = (value: Date) => {
    const formatedDate = moment(value).format("DD.MM.YYYY");
    dispatch(addDate(formatedDate));
  };

  const handleTimeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addTime(e.target.value));
  };

  const handleNextStepClick = () => {
    dispatch(changeStepIncrement());
  };

  const handleCheckboxChange = () => {
    dispatch(changeCheckbox());
  };
  const dateValue = useMemo((): Date => formatDate(date), [date]);

  return (
    <>
      <div className={styles.dateContainer}>
        <div className={styles.wrapperForTime}>
          <p
            className={classNames(
              "text",
              "text_size_small",
              "text_type_regular ",
              "m-0",
              styles.time
            )}
          >
            Время
          </p>
          <div className={styles.headerWrapper} />
          <input
            type="time"
            id="time"
            name="time"
            onChange={handleTimeValueChange}
            value={time}
            required
            className={classNames(
              "text",
              "text_size_small",
              "text_type_regular ",
              styles.inputForTime
            )}
          />
        </div>
        <div className={styles.wrapperForDate}>
          <p
            className={classNames(
              "text",
              "text_size_small",
              "text_type_regular ",
              "m-0",
              styles.date
            )}
          >
            Дата
          </p>
          <div className={styles.headerWrapperForDatePicker} />
          <DatePicker onChangeValue={handleDateValueChange} value={dateValue} />
        </div>
        <div className={styles.checkbox}>
          <Checkbox
            label="Бессрочно"
            onChange={handleCheckboxChange}
            checked={termlessRequest}
            id="termlessRequest"
            extClassName="text_size_medium"
          />
        </div>
      </div>
      <div className={styles.button}>
        <Button
          buttonType="primary"
          label="Продолжить"
          onClick={handleNextStepClick}
        />
      </div>
    </>
  );
};
