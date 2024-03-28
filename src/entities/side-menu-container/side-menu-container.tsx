import { ReactNode } from 'react';
import classnames from 'classnames';

import { Icon } from 'shared/ui/icons';

import styles from './styles.module.css';

export interface SideMenuContainerProps {
  border?: 'sea' | 'main' | 'mobile';
  size?: 'web' | 'mob';
  children?: ReactNode;
  overlayVisible?: boolean;
  extClassName?: string;
}

export const SideMenuContainer = ({
  border = 'sea',
  size = 'web',
  children,
  overlayVisible,
  extClassName,
}: SideMenuContainerProps) => (
  <div
    className={classnames(
      styles.button__container,
      styles[`button__container--${size}`],
      styles[`button__container--${border}`],
      extClassName
    )}
    style={{ border }}
  >
    {children}

    {overlayVisible && (
      <div className={styles.overlay}>
        <Icon color="white" icon="LockIcon" size="196" />
      </div>
    )}
  </div>
);
