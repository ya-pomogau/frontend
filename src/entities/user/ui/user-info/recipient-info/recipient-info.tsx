import classnames from 'classnames';
import { ProgressIcon } from 'shared/ui/icons/progress-icon';

import styles from '../styles.module.css';

interface RecipientInfoProps {
  tasksCount: number;
  completedTasksCount: number;
}

export const RecipientInfo = ({
  tasksCount,
  completedTasksCount,
}: RecipientInfoProps) => (
  <div className={styles.recipientInfo}>
    <div className={styles.dataWrapper}>
      <span className={classnames('text', 'text_size_small', styles.count)}>
        {`${completedTasksCount} из ${tasksCount}`}
      </span>
      <ProgressIcon size="32" color="blue" />
    </div>
  </div>
);
