import React, { useMemo } from 'react';
import classNames from 'classnames';
import { format, parse } from 'date-fns';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setDate,
  setTime,
  changeCheckbox,
  changeStepIncrement,
} from 'features/create-request/model';
import { Button } from 'shared/ui/button';
import Checkbox from 'shared/ui/checkbox';
import { DatePicker } from 'shared/ui/date-picker';

import styles from './date-step.module.css';

interface IDateStepProps {
  isMobile?: boolean;
}

export const DateStep = ({ isMobile }: IDateStepProps) => {
  const { time, termlessRequest, date } = useAppSelector(
    (state) => state.createRequest
  );
  const dispatch = useAppDispatch();

  const handleDateValueChange = (value: Date) => {
    const formatedDate = format(value, 'dd.MM.yyyy');
    dispatch(setDate(formatedDate));
  };

  const handleTimeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTime(e.target.value));
  };

  const handleNextStepClick = () => {
    dispatch(changeStepIncrement());
  };

  const handleCheckboxChange = () => {
    dispatch(changeCheckbox());
  };
  const dateValue = useMemo(
    (): Date => parse(date, 'dd.MM.yyyy', new Date()),
    [date]
  );

  return (
    <>
      <div className={styles.dateContainer}>
        <div className={styles.wrapperForTime}>
          <p className={classNames(styles.time, 'text', 'text_type_regular ')}>
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
              'text',
              'text_size_small',
              'text_type_regular ',
              styles.inputForTime
            )}
          />
        </div>
        <div className={styles.wrapperForDate}>
          <p className={classNames('text', 'text_type_regular ', styles.date)}>
            Дата
          </p>
          <div className={styles.headerWrapperForDatePicker} />
          <DatePicker
            onChangeValue={handleDateValueChange}
            value={dateValue}
            isMobile={isMobile}
          />
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
