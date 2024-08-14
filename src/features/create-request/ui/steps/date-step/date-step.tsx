import { useMemo, useEffect, useState, useRef, ChangeEvent } from 'react';
import classNames from 'classnames';
import { format, parse } from 'date-fns';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setDate,
  setTime,
  changeCheckbox,
} from 'features/create-request/model';
import { Button } from 'shared/ui/button';
import Checkbox from 'shared/ui/checkbox';
import { DatePicker } from 'shared/ui/date-picker';

import styles from './date-step.module.css';
import usePropsButtonCustom from '../useButtonPropsCustom';
import { TimePickerPopup } from '../../../../../shared/ui/time-picker-popup';

interface IDateStepProps {
  isMobile?: boolean;
}

export const DateStep = ({ isMobile }: IDateStepProps) => {
  const { time, termlessRequest, date } = useAppSelector(
    (state) => state.createRequest
  );
  const dispatch = useAppDispatch();
  const [timeValidation, setTimeValidation] = useState(false);
  const [isOpenClockElement, setIsOpenClockElement] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleAcceptTime = (selectedTime: any) => {
    console.log(selectedTime);
  };
  const handleDateValueChange = (value: Date) => {
    const formattedDate = format(value, 'dd.MM.yyyy');
    dispatch(setDate(formattedDate));
  };

  const handleTimeValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTime(e.target.value));
  };

  useEffect(() => {
    const dateNow = new Date();
    const currentTime = format(dateNow, 'HH:mm'); 
    const currentDate = dateNow.toLocaleDateString(); 

    if (
      (time && time < currentTime && date && currentDate === date) ||
      time === ''
    ) {
      setTimeValidation(true);
    } else {
      setTimeValidation(false);
    } //сравниваю даты
  }, [time, date]);

  useEffect(() => {
    if (termlessRequest) {
      dispatch(setTime(''));
    }
  }, [termlessRequest]);

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
      <div className={styles.dateWithButtonContainer}>
        <div className={styles.dateContainer}>
          <div className={styles.wrapperForTime}>
            {isMobile && (
              <TimePickerPopup
                isPopupOpen={isOpenClockElement}
                buttonRef={buttonRef}
                setIsOpenClockElement={setIsOpenClockElement}
                handleAcceptTime={() => handleAcceptTime}
              />
            )}
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
              onClick={() => setIsOpenClockElement(!isOpenClockElement)}
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
          {(timeValidation || !time) && !termlessRequest && (
            <p className={styles.validationMessage}>
              {
                'Пожалуйста, выберите время, которое больше текущего или установите формат "Бессрочно"'
              }
            </p>
          )}
          <div className={classNames(styles.buttonWrapper, 'buttonWithRightMargin')}>
            <Button
              buttonType="primary"
              disabled={(timeValidation || !time) && !termlessRequest}
              label={propsButton.label}
              onClick={propsButton.onClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};
