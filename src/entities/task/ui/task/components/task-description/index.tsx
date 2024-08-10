import classNames from 'classnames';
import { useRef } from 'react';

import { useTruncatedText } from 'shared/hooks';
import { Icon } from 'shared/ui';

import styles from './styles.module.css';

interface TaskDescriptionProps {
  description: string;
  count: number;
  extClassName?: string;
}

export const TaskDescription = ({
  description,
  count,
  extClassName,
}: TaskDescriptionProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { isTruncated, isExpanded, toggleIsShowingMore } =
    useTruncatedText(textRef);

  const textStyles = classNames(styles.card__task, {
    [styles.taskExpanded]: isExpanded,
  });

  return (
    <div className={classNames(extClassName, styles.taskDescription)}>
      <div className={styles.card__expandable}>
        <p ref={textRef} className={textStyles}>
          {description}
        </p>
        {isTruncated && (
          <button onClick={toggleIsShowingMore} className={styles.expandBtn}>
            {isExpanded ? 'Свернуть' : 'Читать'}
          </button>
        )}
      </div>
      <div className={styles.score}>
        <Icon color="blue" icon="BallsIcon" size="46" />
        <span className={styles.scoreText}>{count}</span>
      </div>
    </div>
  );
};
