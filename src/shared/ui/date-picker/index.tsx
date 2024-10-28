/* eslint-disable react/display-name */
/* eslint-disable import/no-duplicates */
import { ReactNode, forwardRef, Ref } from 'react';
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { subDays } from 'date-fns';

import { getMonth } from './lib';
import { StepButton } from '../step-button';

import './react-datepicker.css';
import styles from './styles.module.css';
import { Typography } from '../typography';

export function customHeader({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps): ReactNode {
  const month = getMonth(date);

  return (
    <div className={styles.datePicker__calendarHeader}>
      <StepButton
        direction="left"
        onClick={decreaseMonth}
        type="button"
        disabled={prevMonthButtonDisabled}
      />
      <div>
        <Typography
          tag={'span'}
          color={'primary'}
          fontFamily={'primaryFont'}
          variant={'paragraph'}
          content={month}
          extraClass={styles.datePicker__headerMonth}
        />
      </div>
      <StepButton
        direction="right"
        onClick={increaseMonth}
        type="button"
        disabled={nextMonthButtonDisabled}
      />
    </div>
  );
}

const CustomInput = forwardRef(
  (
    { value, onClick }: { value: any; onClick: any },
    ref: Ref<HTMLButtonElement>
  ) => (
    <button
      type="button"
      className={styles.customInput}
      onClick={onClick}
      ref={ref}
    >
      <Typography
        tag={'span'}
        color={'interface-additional'}
        fontFamily={'primaryFont'}
        variant={'support'}
        content={value}
      />
    </button>
  )
);

export interface IDatePickerProps {
  value: Date;
  onChangeValue: (date: Date) => void;
  isMobile?: boolean;
  filter?: (date: Date) => boolean;
  extClassName?: string;
  minDate?: Date | null;
  inline?: boolean;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChangeValue,
  isMobile = false,
  filter,
  extClassName,
  minDate = subDays(new Date(), 0),
  inline = true,
  disabled = false,
}: IDatePickerProps) {
  const handleOnChange = (date: Date) => {
    if (date) onChangeValue(date);
  };

  return (
    <ReactDatePicker
      selected={!disabled ? value : null}
      className={extClassName}
      onChange={handleOnChange}
      filterDate={filter}
      showPopperArrow={false}
      locale={ru}
      inline={inline}
      wrapperClassName={styles.datePicker}
      calendarClassName={
        isMobile
          ? styles.dataPicker__calendar_mobile
          : styles.dataPicker__calendar
      }
      dateFormat="dd MMMM yyyy"
      fixedHeight
      popperClassName={styles.customPopper}
      renderCustomHeader={customHeader}
      dayClassName={() => styles.dataPicker__calendarWeekDay}
      minDate={minDate}
      maxDate={!disabled ? null : minDate}
      customInput={<CustomInput value={undefined} onClick={undefined} />}
    />
  );
}
