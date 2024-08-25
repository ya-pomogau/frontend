import { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useMediaQuery } from 'shared/hooks';
import { Breakpoints } from 'shared/config';

import styles from '../styles.module.css';
import { TimePickerElement } from 'shared/ui/time-picker';

interface TimeBlockProps {
  onChange: (value: string[]) => void;
  filterTime: Array<string>;
}

export const TimeBlock = ({ onChange }: TimeBlockProps) => {
  const isMobile = useMediaQuery(Breakpoints.L);
  const buttonRef = useRef<HTMLInputElement>(null);
  const [startTime, setStartTime] = useState<string>('00:00');
  const [endTime, setEndTime] = useState<string>('00:00');

  useEffect(() => {
    onChange([startTime, endTime]);
  }, [startTime, endTime]);

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
      </div>
    </div>
  );
};
