import { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import styles from '../styles.module.css';
import { TimePickerElement } from 'shared/ui/time-picker';

interface TimeBlockProps {
  onChange: (name: string, value: string[] | string) => void;
  filterTime: Array<string>;
}

export const TimeBlock = ({ onChange, filterTime }: TimeBlockProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef<HTMLInputElement>(null);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');

  const setTypeResolution = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    onChange('time', [startTime, endTime]);
  }, [startTime, endTime]);

  useEffect(() => {
    setTypeResolution();
    window.addEventListener('resize', setTypeResolution);
    return () => {
      window.removeEventListener('resize', setTypeResolution);
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
            isMobile={isMobile}
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
            isMobile={isMobile}
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
      </div>
    </div>
  );
};
