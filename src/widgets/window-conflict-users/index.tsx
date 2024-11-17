import cn from 'classnames';
import { ReactElement, FC } from 'react';
import styles from './styles.module.css';
import { useMediaQuery } from 'shared/hooks';
import { Icon } from 'shared/ui/icons';
import { GradientDivider } from 'shared/ui/gradient-divider';
import { Breakpoints } from 'shared/config';
import { InfoConflict } from 'widgets/conflict-information';
import { TaskConflict } from 'entities/task/types';
import { Typography } from 'shared/ui';

interface IWindowConflictUsers {
  isOpen: boolean;
  onClick?: (text: string) => void;
  boxButton: ReactElement;
  close: () => void;
  task: TaskConflict;
}

export const WindowConflictUsers: FC<IWindowConflictUsers> = ({
  task,
  isOpen,
  close,
  boxButton,
}) => {
  const isMobile = useMediaQuery(Breakpoints.S);

  const handleClick = () => {
    close();
  };

  return (
    <article className={cn(styles.box, { [styles.box_action]: isOpen })}>
      <div className={styles['container-mobile']}>
        {isMobile && (
          <Icon
            onClick={handleClick}
            className={cn(styles.arrow, styles.cursor)}
            color="#9798C9"
            icon="ArrowIcon"
            size="32"
          />
        )}
        <Typography
          tag={'h4'}
          fontFamily={'secondaryFont'}
          variant={'title'}
          content={'Конфликт'}
        />
        {isMobile && (
          <GradientDivider extClassName={styles['gradient-divider']} />
        )}
      </div>
      <div className={styles['content-container']}>
        <InfoConflict info={task} />
      </div>
      {!isMobile ? (
        <Icon
          onClick={handleClick}
          className={cn(styles['btn-close'], styles.cursor)}
          color="#9798C9"
          icon="CloseCrossIcon"
          size="14"
        />
      ) : (
        <GradientDivider />
      )}
      <div className={styles.isMobile}>{boxButton}</div>
    </article>
  );
};
