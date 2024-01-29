import { Icon } from 'shared/ui/icons';
import styles from './styles.module.css';
import classNames from 'classnames';
import { format } from 'date-fns';
import { useMediaQuery } from 'shared/hooks';

interface TaskInfoProps {
  date?: string;
  address: string;
  extClassName?: string;
}

export const TaskInfo = ({ date, address, extClassName }: TaskInfoProps) => {
  const isMobile = useMediaQuery('(max-width:1150px)');
  return (
    <div className={classNames(extClassName, styles.infoDate)}>
      <div
        className={classNames(
          styles.date,
          isMobile ? 'text_size_medium text_type_bold' : 'text_size_large'
        )}
      >
        <Icon
          color="blue"
          icon="CalendarIcon"
          size="24"
          className={styles.icon}
        />
        <p className="m-0">
          {date ? format(new Date(date), 'dd.MM.yyyy') : 'бессрочно'}
        </p>
      </div>
      <div
        className={classNames(
          styles.time,
          isMobile ? 'text_size_medium text_type_bold' : 'text_size_large'
        )}
      >
        <Icon color="blue" icon="ClockIcon" size="24" className={styles.icon} />
        <p className="m-0">
          {date ? format(new Date(date), 'kk.mm') : '00:00-00:00'}
        </p>
      </div>
      <div className={styles.address}>
        <Icon
          color="blue"
          icon="LocationIcon"
          size="24"
          className={styles.icon}
        />
        <p
          className={
            isMobile
              ? 'text_size_medium text_type_bold'
              : 'm-0 text_size_medium'
          }
        >
          {address}
        </p>
      </div>
    </div>
  );
};
