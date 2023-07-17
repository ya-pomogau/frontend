import { ReactNode } from 'react';
import classnames from 'classnames';

import { useAppSelector } from 'app/hooks';
import { Loader } from '../loader';

import styles from './styles.module.css';

interface PageLayoutProps {
  extClassName?: string;
  side: ReactNode;
  content: ReactNode;
}

export const PageLayout = ({
  extClassName,
  side,
  content,
}: PageLayoutProps) => {
  const isLoadingUserData = useAppSelector((state) => state.user.isLoading);
  const isLoadingTasksData = useAppSelector((state) => state.tasks.isLoading);

  return (
    <>
      {(isLoadingUserData || isLoadingTasksData) && <Loader />}

      <div className={classnames(styles.main, extClassName)}>
        <div className={styles.side}> {side} </div>
        <div className={styles.content}> {content} </div>
      </div>
    </>
  );
};
