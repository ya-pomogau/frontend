import classnames from 'classnames';

import { BallsIcon } from 'shared/ui/icons/balls-icon';
import { KeyIcon } from 'shared/ui/icons/key-icon';

import styles from '../styles.module.css';
import { FinishedApplicationIcon } from 'shared/ui/icons/finished-application-icon';
import { useMediaQuery } from 'shared/hooks';

interface VolunteerInfoProps {
  score: number;
  hasKey?: number | null;
  extClassName?: string;
  finishScore?: number;
}

export const VolunteerInfo = ({
  score,
  hasKey,
  extClassName,
  finishScore,
}: VolunteerInfoProps) => {
  const isMobile = useMediaQuery('(max-width: 920px)');
  return (
    <div className={classnames(extClassName, styles.volunteerInfo)}>
      <div className={styles.dataWrapper}>
        <BallsIcon size="32" color="blue" />
        <span className={classnames('text', 'text_size_small', styles.count)}>
          {score}
        </span>
      </div>
      {hasKey && (
        <div className={styles.dataWrapper}>
          <KeyIcon size="24" color="blue" />
          <span className={classnames('text', 'text_size_small', styles.count)}>
            {hasKey}
          </span>
        </div>
      )}
      {isMobile && (
        <div className={styles.dataWrapper}>
          <FinishedApplicationIcon size="24" color="blue" />
          <span className={classnames('text', 'text_size_small', styles.count)}>
            {finishScore}
          </span>
        </div>
      )}
    </div>
  );
};
