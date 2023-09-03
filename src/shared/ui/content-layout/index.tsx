import { LegacyRef, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

interface ContentLayoutProps {
  extClassName?: string;
  heading: ReactNode;
  children: ReactNode;
  componentRef?: LegacyRef<HTMLDivElement> | undefined;
}

export const ContentLayout = ({
  extClassName,
  heading,
  children,
  componentRef,
}: ContentLayoutProps) => (
  <div className={classnames(styles.content, extClassName)}>
    <div className={styles.smart}>{heading}</div>
    <div ref={componentRef} className={styles.list}>
      {children}
    </div>
  </div>
);
