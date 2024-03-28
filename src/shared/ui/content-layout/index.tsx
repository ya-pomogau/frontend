import { ReactNode } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

interface ContentLayoutProps {
  extClassName?: string;
  heading: ReactNode;
  children: ReactNode;
}

export const ContentLayout = ({
  extClassName,
  heading,
  children,
}: ContentLayoutProps) => (
  <div className={classnames(styles.content, extClassName)}>
    <div className={styles.smart}>{heading}</div>
    <div className={styles.list}>{children}</div>
  </div>
);
