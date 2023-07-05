/* eslint-disable import/no-duplicates */
import { ReactNode } from "react";
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import ru from "date-fns/locale/ru";
import { subDays } from "date-fns";
import { getMonth } from "./lib";
import { StepButton } from "../step-button/index";
import "./react-datepicker.css";
import styles from "./styles.module.css";

function customHeader({
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
        <span className={styles.datePicker__headerMonth}>{month}</span>
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

export interface IDatePickerProps {
  value: Date;
  onChangeValue: (date: Date) => void;
  isMobile?: boolean;
  filter?: (date: Date) => boolean;
  extClassName?: string;
  minDate?: Date | null;
}

export function DatePicker({
  value,
  onChangeValue,
  isMobile = false,
  filter,
  extClassName,
  minDate = subDays(new Date(), 0)
}: IDatePickerProps) {
  const handleOnChange = (date: Date) => {
    if (date) onChangeValue(date);
  };

  return (
    <ReactDatePicker
      selected={value}
      className={extClassName}
      onChange={handleOnChange}
      filterDate={filter}
      showPopperArrow={false}
      locale={ru}
      inline={window.innerWidth > 768 || false}
      wrapperClassName={styles.datePicker}
      calendarClassName={
        isMobile
          ? styles.dataPicker__calendar_mobile
          : styles.dataPicker__calendar
      }
      dateFormat="dd MMMM yyyy"
      fixedHeight
      renderCustomHeader={customHeader}
      dayClassName={() => styles.dataPicker__calendarWeekDay}
      minDate={minDate}
    />
  );
}
