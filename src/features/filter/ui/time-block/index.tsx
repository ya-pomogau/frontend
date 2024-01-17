import { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import styles from '../styles.module.css';
import { TimePickerElement } from 'shared/ui/time-picker';

interface TimeBlockProps {
  onChange: (name: string, value: string[] | string) => void;
  filterTime: Array<string>;
  time: string[];
}

export const TimeBlock = ({ onChange, filterTime, time }: TimeBlockProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef<HTMLInputElement>(null);

  const [times, setTimes] = useState<string[]>(time);
  console.log(`time ${times}`);

  const setTypeResolution = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    onChange('time', [times[0], times[1]]);
  }, [times]);

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
            times={times}
            setTimes={setTimes}
            variant="start"
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
            variant="end"
            isMobile={isMobile}
            buttonRef={buttonRef}
            times={times}
            setTimes={setTimes}
          />
        </div>
      </div>
    </div>
  );
};
