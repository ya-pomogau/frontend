import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import moment from "moment";
import classNames from "classnames";
import {
  addDate,
  addTime,
  changeCheckbox,
  changeStepIncrement,
} from "features/create-request/model";

import React from "react";
import { Button } from "shared/ui/button";
import Checkbox from "shared/ui/checkbox";
import { DatePicker } from "shared/ui/date-picker";
import styles from "./date-step.module.css";

export const DateStep = () => {
  const { time, termlessRequest } = useAppSelector(
    (state: RootState) => state.createRequest
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

  return (
    <>
      <div className={styles.dateContainer}>
        <div className={styles.wrapperForTime}>
          <p
            className={classNames(
              "text",
              "text_size_small",
              "text_type_regular ",
              "m-0"
            )}
          >
            Время
          </p>
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
              "m-0"
            )}
          >
            Дата
          </p>
          <DatePicker onChangeValue={handleDateValueChange} />
        </div>
        <div className={styles.checkbox}>
          <Checkbox
            label="Бессрочно"
            onChange={handleCheckboxChange}
            checked={termlessRequest}
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
