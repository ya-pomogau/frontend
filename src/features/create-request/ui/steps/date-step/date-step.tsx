import React, { useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { format, parse } from 'date-fns';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setDate,
  setTime,
  changeCheckbox,
  changeStepIncrement,
  setDateValidation,
} from 'features/create-request/model';
import { Button } from 'shared/ui/button';
import Checkbox from 'shared/ui/checkbox';
import { DatePicker } from 'shared/ui/date-picker';

import styles from './date-step.module.css';
import usePropsButtonCustom from '../useButtonPropsCustom';

interface IDateStepProps {
  isMobile?: boolean;
}

export const DateStep = ({ isMobile }: IDateStepProps) => {
  const { time, termlessRequest, date, isTypeEdit, dateValidation } = useAppSelector(
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

  useEffect(() => {
    const currentTime = new Date(); // текущая дата
    const currentFormattedTime = format(currentTime, 'HH:mm'); // привожу в нужный формат
    if (time && time < currentFormattedTime) {
      dispatch(setDateValidation(true));
    } else {
      dispatch(setDateValidation(false));
    } //сравниваю даты
  }, [time]);

  useEffect(() => {
    if (termlessRequest) {
      dispatch(setTime(''));
    }
  }, [termlessRequest]);

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
  const propsButton = usePropsButtonCustom();
  return (
    <>
      <div className={styles.dateContainer}>
        <div className={styles.wrapperForTime}>
          <p className={classNames(styles.time, 'text', 'text_type_regular ')}>
            Время
          </p>
          <div className={styles.headerWrapper} />
          <input
            disabled={termlessRequest}
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
        {dateValidation ? (
          <p className={styles.validationMessage}>{'Введите валидное время'}</p>
        ) : (
          <></>
        )}
        <Button
          buttonType="primary"
          label={propsButton.label}
          onClick={propsButton.onClick}
          disabled={!time || dateValidation === true}
        />
      </div>
    </>
  );
};
