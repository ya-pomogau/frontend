import classNames from 'classnames';
import { format } from 'date-fns';

import { Icon, Typography } from 'shared/ui';

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
        <Typography
          tag={'span'}
          color={'primary'}
          variant={'titleResize'}
          content={currentDate}
          extraClass={styles.dateText}
        />
      </div>
      <div className={styles.time}>
        <Icon color="blue" icon="ClockIcon" size="24" className={styles.icon} />
        <Typography
          tag={'span'}
          color={'primary'}
          variant={'titleResize'}
          content={currentTime}
          extraClass={styles.dateText}
        />
      </div>
      <div className={styles.address}>
        <Icon
          color="blue"
          icon="LocationIcon"
          size="24"
          className={`${styles.icon} ${styles.iconLocation}`}
        />
        <Typography
          tag={'span'}
          color={'primary'}
          content={address}
          extraClass={styles.addressText}
        />
      </div>
    </div>
  );
};
