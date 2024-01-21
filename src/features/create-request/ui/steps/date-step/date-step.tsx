import React, { useMemo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { format, parse } from 'date-fns';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setDate,
  setTime,
  changeCheckbox,
  changeStepIncrement,
  clearTime,
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
  // const [inputValue, setInputValue] = useState('');
  // const [isTimePassed, setIsTimePassed] = useState(false);

  const handleDateValueChange = (value: Date) => {
    const formatedDate = format(value, 'dd.MM.yyyy');
    dispatch(setDate(formatedDate));
  };

  const handleTimeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTime = new Date(); // текущая дата
    const currentFormattedTime = format(currentTime, 'HH:mm'); // привожу в нужный формат
    const selectedTime = new Date(`1970-01-01T${e.target.value}:00`); //фиктивная дата '1970-01-01', чтобы установить только время, а не дату
    const selectedFormattedTime = format(selectedTime, 'HH:mm'); // привожу в нужный формат
    //
    if (time < currentFormattedTime) {
      // console.log('время меньше');
      console.log(selectedFormattedTime);
      console.log(currentFormattedTime);

      dispatch(setTime(currentFormattedTime));
      return;
    } //сравниваю даты
    // console.log('время норм');
    dispatch(setTime(e.target.value));
    // setInputValue(e.target.value);
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
            // value={time}
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
            disabled={termlessRequest}
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
          disabled={!time}
        />
      </div>
    </>
  );
};
