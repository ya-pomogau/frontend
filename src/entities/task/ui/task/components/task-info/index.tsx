import classNames from 'classnames';
import { format } from 'date-fns';

import { Icon } from 'shared/ui';

import styles from './styles.module.css';

interface TaskInfoProps {
  date: string | null;
  address: string;
  extClassName?: string;
}

export const TaskInfo = ({ date, address, extClassName }: TaskInfoProps) => {
  const [currentDate, currentTime] = date
    ? [format(new Date(date), 'dd.MM.yyyy'), format(new Date(date), 'HH:mm')]
    : ['бессрочно', 'бессрочно'];

  return (
    <div className={classNames(extClassName, styles.taskInfo)}>
      <div className={styles.date}>
        <Icon
          color="blue"
          icon="CalendarIcon"
          size="24"
          className={styles.icon}
        />
        <span>{currentDate}</span>
      </div>
      <div className={styles.time}>
        <Icon color="blue" icon="ClockIcon" size="24" className={styles.icon} />
        <span>{currentTime}</span>
      </div>
      <div className={styles.address}>
        <Icon
          color="blue"
          icon="LocationIcon"
          size="24"
          className={`${styles.icon} ${styles.iconLocation}`}
        />
        <span>{address}</span>
      </div>
    </div>
  );
};
