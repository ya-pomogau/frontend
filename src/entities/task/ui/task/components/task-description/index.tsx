import { useLayoutEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { Icon } from 'shared/ui/icons';
import classNames from 'classnames';

interface TaskDescriptionProps {
  description: string;
  count: number;
  extClassName?: string;
}

const expandedClass = styles.taskExpanded;

export const TaskDescription = ({
  description,
  count,
  extClassName,
}: TaskDescriptionProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const setButtonVisibility = (expandable: HTMLParagraphElement) => {
    if (expandable.scrollHeight > expandable.clientHeight) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  };

  const handleExpandClick = () => {
    if (textRef.current) {
      setIsExpanded(!isExpanded);
    }
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      if (textRef.current) {
        textRef.current.classList.remove(expandedClass);
        setIsExpanded(false);
        setButtonVisibility(textRef.current);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={classNames(extClassName, styles.taskDescription)}>
      <div className={styles.card__expandable}>
        <p
          ref={textRef}
          className={classNames(styles.card__task, {
            [expandedClass]: isExpanded,
          })}
        >
          {description}
        </p>
        {isButtonVisible && (
          <button
            onClick={handleExpandClick}
            className={classNames(styles.expandBtn, 'text')}
          >
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