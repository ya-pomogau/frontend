import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

import { DatePicker } from 'shared/ui/date-picker';

import styles from '../styles.module.css';
import classNames from 'classnames';

interface CalenderBlockProps {
  onChange: (name: string, value: string[] | string) => void;
  filterDate: string;
}

export const CalenderBlock = ({ onChange, filterDate }: CalenderBlockProps) => {
  const [isCalenderMobil, setIsCalenderMobil] = useState(false);

  const handleDateChange = (date: Date) => {
    const formatedDate = format(date, 'yyyy-MM-dd');
    onChange('date', formatedDate);
  };

  // определение того, в каком виде должен быть календарь: десктопном или мобильном, в том числе
  // для случаев, когда изменение размера экрана происходит из-за изменения размера браузера
  const setTypeCalender = () => {
    if (window.innerWidth <= 768) {
      setIsCalenderMobil(true);
    } else {
      setIsCalenderMobil(false);
    }
  };
  // получение текущей даты (без времени внутри суток)
  function getNewDate() {
    const newDate = new Date();
    const newDateWithoutTime = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate()
    );
    setTimeout(() => {
      handleDateChange(newDateWithoutTime);
    });
    return newDateWithoutTime;
  }
  useEffect(() => {
    setTypeCalender();
    window.addEventListener('resize', setTypeCalender);
    return () => {
      window.removeEventListener('resize', setTypeCalender);
    };
  }, []);

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
          value={filterDate ? parseISO(filterDate) : getNewDate()}
          isMobile={isCalenderMobil}
          onChangeValue={handleDateChange}
          inline={window.innerWidth > 768 || false}
        />
      </div>
    </div>
  );
};
