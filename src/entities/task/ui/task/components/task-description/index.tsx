import { useLayoutEffect, useRef } from 'react';
import styles from './styles.module.css';
import { Icon } from 'shared/ui/icons';
import classNames from 'classnames';
// import { useMediaQuery } from 'shared/hooks';

interface TaskDescriptionProps {
  description: string;
  count: number;
  extClassName?: string;
}

function setButtonVisibility(
  expandable: HTMLParagraphElement,
  btn: HTMLButtonElement
) {
  if (expandable.scrollHeight > expandable.clientHeight) {
    btn.style.display = 'inline';
    btn.textContent = 'Читать';
  } else {
    btn.style.display = 'none';
  }
}

function handleExpandClick(
  btn: HTMLButtonElement,
  expandable: HTMLParagraphElement
) {
  expandable.classList.toggle(expandedClass);
  btn.textContent = expandable.classList.contains(expandedClass)
    ? 'Свернуть'
    : 'Читать';
}

const expandedClass = styles.taskExpanded;

export const TaskDescription = ({
  description,
  count,
  extClassName,
}: TaskDescriptionProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (textRef.current && btnRef.current) {
        textRef.current.classList.remove(expandedClass);
        setButtonVisibility(textRef.current, btnRef.current);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const isMobile = useMediaQuery('(max-width:1150px)');

  return (
    <div className={classNames(extClassName, styles.taskDescription)}>
      <div className={styles.card__expandable}>
        <p ref={textRef} className={styles.card__task}>
          {description}
        </p>
        <button
          onClick={(e) => {
            if (textRef.current) {
              handleExpandClick(e.target as HTMLButtonElement, textRef.current);
            }
          }}
          ref={btnRef}
          className={classNames(styles.expandBtn, 'text')}
        >
          Читать
        </button>
      </div>

      <div className={styles.score}>
        <Icon color="blue" icon="BallsIcon" size="46" />
        <span className={styles.scoreText}>{count}</span>
      </div>
    </div>
  );
};
