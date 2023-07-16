import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import classnames from 'classnames';

import { DatePicker } from 'shared/ui/date-picker';

import styles from '../styles.module.css';

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
    <div className={styles.filterBlock}>
      <div
        className={classnames(
          styles.filterBlockTitle,
          'text',
          'text_size_small',
          'text_type_bold'
        )}
      >
        Дата и время
      </div>
      <div>
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
