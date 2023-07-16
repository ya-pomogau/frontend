import classnames from 'classnames';

import { BallsIcon } from 'shared/ui/icons/balls-icon';
import { KeyIcon } from 'shared/ui/icons/key-icon';

import styles from '../styles.module.css';

interface VolunteerInfoProps {
  score: number;
  hasKey?: boolean;
}

export const VolunteerInfo = ({ score, hasKey }: VolunteerInfoProps) => (
  <div className={styles.volunteerInfo}>
    <div className={styles.dataWrapper}>
      <BallsIcon size="32" color="blue" />
      <span className={classnames('text', 'text_size_small', styles.count)}>
        {score}
      </span>
    </div>
    <div className={styles.dataWrapper}>
      <KeyIcon size="24" color="blue" />
      <span className={classnames('text', 'text_size_small', styles.count)}>
        {hasKey ? '1' : '0'}
      </span>
    </div>
  </div>
);
