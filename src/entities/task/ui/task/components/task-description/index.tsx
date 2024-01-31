import { useState } from 'react';
import styles from './styles.module.css';
import { Icon } from 'shared/ui/icons';
import classNames from 'classnames';
import { useMediaQuery } from 'shared/hooks';

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
  const isMobile = useMediaQuery('(max-width:1150px)');
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className={classNames(extClassName, styles.descriptionMain)}>
      <div className={styles.textWithButton}>
        <p
          className={classNames(
            styles.description,
            isHidden && styles.description_hidden,
            'm-0'
          )}
        >
          {description}
          {description.length > 198 && (
            <button
              type="button"
              className={`text text_size_medium ${styles.button} ${
                !isHidden && !isMobile && styles.buttonUnderText
              } `}
              onClick={() => setIsHidden(!isHidden)}
            >
              {isHidden ? 'Читать' : 'Свернуть'}
            </button>
          )}
        </p>
      </div>

      <div className={styles.icon}>
        <Icon
          color="blue"
          icon={isMobile ? 'FinishedApplicationIcon' : 'BallsIcon'}
          size={isMobile ? '32' : '46'}
        />
        <p className={`${styles.count} text_size_small`}>{count}</p>
      </div>
    </div>
  );
};
