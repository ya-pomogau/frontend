import { Icon } from 'shared/ui/icons';
import styles from './styles.module.css';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useMediaQuery } from 'shared/hooks';

interface TaskInfoProps {
  date: string | null;
  address: string;
  extClassName?: string;
}

export const TaskInfo = ({ date, address, extClassName }: TaskInfoProps) => {
  const isMobile = useMediaQuery('(max-width:1150px)');

  return (
    <div className={classNames(extClassName, styles.taskInfo)}>
      <div className={styles.date}>
        <Icon
          color="blue"
          icon="CalendarIcon"
          size="24"
          className={styles.icon}
        />
        <span>{date ? format(new Date(date), 'dd.MM.yyyy') : 'бессрочно'}</span>
      </div>
      <div className={styles.time}>
        <Icon color="blue" icon="ClockIcon" size="24" className={styles.icon} />
        <span>{date ? format(new Date(date), 'HH:mm') : 'бессрочно'}</span>
      </div>
      <div className={styles.address}>
        <Icon
          color="blue"
          icon="LocationIcon"
          size="24"
          className={classNames(styles.icon, styles.iconLocation)}
        />
        <span>{address}</span>
      </div>
    </div>
  );
};
