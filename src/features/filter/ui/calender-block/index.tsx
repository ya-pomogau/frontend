import { format, parseISO } from 'date-fns';
import { DatePicker } from 'shared/ui/date-picker';
import { useMediaQuery } from 'shared/hooks';
import { Breakpoints } from 'shared/config';
import styles from '../styles.module.css';
import classNames from 'classnames';

interface CalenderBlockProps {
  value: string;
  onChange: (value: string) => void;
}

export const CalenderBlock = ({ value, onChange }: CalenderBlockProps) => {
  const isCalenderMobil = useMediaQuery(Breakpoints.L);

  const handleDateChange = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    onChange(formattedDate);
  };

  // определение того, в каком виде должен быть календарь: десктопном или мобильном, в том числе
  // для случаев, когда изменение размера экрана происходит из-за изменения размера браузера
  // const setTypeCalender = () => {
  //   if (window.innerWidth <= 768) {
  //     setIsCalenderMobil(true);
  //   } else {
  //     setIsCalenderMobil(false);
  //   }
  // };
  // // получение текущей даты (без времени внутри суток)
  // function getNewDate() {
  //   const newDate = new Date();
  //   const newDateWithoutTime = new Date(
  //     newDate.getFullYear(),
  //     newDate.getMonth(),
  //     newDate.getDate()
  //   );
  //   setTimeout(() => {
  //     handleDateChange(newDateWithoutTime);
  //   });
  //   return newDateWithoutTime;
  // }

  return (
    <div>
      <p
        className={classNames(
          styles.filterBlockText,
          'text',
          'text_size_small'
        )}
      >
        Дата
      </p>
      <div className={styles.calendar}>
        <DatePicker
          value={value ? parseISO(value) : new Date()}
          isMobile={isCalenderMobil}
          onChangeValue={handleDateChange}
          inline={!isCalenderMobil}
        />
      </div>
    </div>
  );
};
