import { ReactNode } from "react";
import ReactDatePicker, {
  ReactDatePickerCustomHeaderProps,
} from "react-datepicker";
import ru from "date-fns/locale/ru";
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
  // value: Date;
  onChangeValue: (date: Date) => void;
  isMobile?: boolean;
  filter?: (date: Date) => boolean;
}

export function DatePicker({
  // value,
  onChangeValue,
  isMobile = false,
  filter,
}: IDatePickerProps) {
  const handleOnChange = (date: Date) => {
    if (date) onChangeValue(date);
  };

  return (
    <ReactDatePicker
      onChange={handleOnChange}
      filterDate={filter}
      showPopperArrow={false}
      locale={ru}
      inline
      wrapperClassName={styles.datePicker}
      calendarClassName={
        isMobile
          ? styles.dataPicker__calendar_mobile
          : styles.dataPicker__calendar
      }
      dateFormat="dd.MM.yyyy"
      fixedHeight
      renderCustomHeader={customHeader}
      dayClassName={() => styles.dataPicker__calendarWeekDay}
    />
  );
}
