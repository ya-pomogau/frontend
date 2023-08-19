import { useState, useEffect, useRef } from 'react';
import { format, parseISO } from 'date-fns';
import classnames from 'classnames';

import { DatePicker } from 'shared/ui/date-picker';

import styles from '../styles.module.css';
import { TimePickerElement } from 'shared/ui/time-picker';

interface CalenderBlockProps {
  onChange: (name: string, value: string[] | string) => void;
  filterDate: string;
}

export const CalenderBlock = ({ onChange, filterDate }: CalenderBlockProps) => {
  const [isCalenderMobil, setIsCalenderMobil] = useState(false);

  const buttonRef = useRef<HTMLInputElement>(null);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  console.log('start:', startTime, 'end:', endTime);

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
        <p
          className={classnames(
            styles.filterBlockText,
            'text',
            'text_size_small'
          )}
        >
          Время
        </p>
        <div className={classnames(styles.filterBlockTime)}>
          <p
            className={classnames(
              styles.filterBlockText,
              'text',
              'text_size_small'
            )}
          >
            От
          </p>
          <TimePickerElement
            isMobile={isCalenderMobil}
            buttonRef={buttonRef}
            startTime={startTime}
            setStartTime={setStartTime}
          />
          <p
            className={classnames(
              styles.filterBlockText,
              'text',
              'text_size_small'
            )}
          >
            До
          </p>
          <TimePickerElement
            isMobile={isCalenderMobil}
            buttonRef={buttonRef}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </div>

        <p
          className={classnames(
            styles.filterBlockText,
            'text',
            'text_size_small'
          )}
        >
          Дата
        </p>
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
