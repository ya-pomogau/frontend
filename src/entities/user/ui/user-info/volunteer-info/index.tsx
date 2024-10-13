import classnames from 'classnames';
import { Icon } from 'shared/ui';

import styles from './styles.module.css';

interface VolunteerInfoProps {
  score: number;
  hasKey?: boolean;
  extClassName?: string;
}

export const VolunteerInfo = ({
  score,
  hasKey,
  extClassName,
}: VolunteerInfoProps) => (
  <div className={classnames(extClassName, styles.volunteerInfo)}>
    <div className={styles.dataWrapper}>
      <Icon icon="BallsIcon" size="32" color="blue" />
      <span className="text text_size_small">{score}</span>
    </div>
    {hasKey && (
      <div className={styles.dataWrapper}>
        <Icon icon="KeyIcon" size="24" color="blue" />
        <span className="text text_size_small">{hasKey}</span>
      </div>
    )}
  </div>
);
