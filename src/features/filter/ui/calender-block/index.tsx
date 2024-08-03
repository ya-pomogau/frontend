import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { DatePicker } from 'shared/ui/date-picker';
import styles from '../styles.module.css';
import classNames from 'classnames';

interface CalenderBlockProps {
  onChange: (name: string, value: string | string[]) => void;
  filterDate: string;
}

export const CalenderBlock = ({ onChange, filterDate }: CalenderBlockProps) => {
  const [isCalenderMobil, setIsCalenderMobil] = useState(false);

  const handleDateChange = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    onChange('date', formattedDate);
  };

  useEffect(() => {
    const setTypeCalender = () => {
      setIsCalenderMobil(window.innerWidth <= 768);
    };
    setTypeCalender(); 
    window.addEventListener('resize', setTypeCalender);
    return () => {
      window.removeEventListener('resize', setTypeCalender);
    };
  }, []);

  return (
    <div>
      <p className={classNames(styles.filterBlockText, 'text', 'text_size_small')}>
        Дата
      </p>
      <div className={styles.calendar}>
        <DatePicker
          value={filterDate ? parseISO(filterDate) : new Date()}
          isMobile={isCalenderMobil}
          onChangeValue={handleDateChange}
          inline={window.innerWidth > 768}
        />
      </div>
    </div>
  );
};
