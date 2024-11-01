import classnames from 'classnames';
import { Icon } from 'shared/ui';

import styles from './styles.module.css';
import { Typography } from 'shared/ui';

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
      <Typography
        tag={'span'}
        color={'primary'}
        variant={'support'}
        content={score}
      />
    </div>
    {hasKey && (
      <div className={styles.dataWrapper}>
        <Icon icon="KeyIcon" size="24" color="blue" />
        <Typography
          tag={'span'}
          color={'primary'}
          variant={'support'}
          content={hasKey}
        />
      </div>
    )}
  </div>
);
