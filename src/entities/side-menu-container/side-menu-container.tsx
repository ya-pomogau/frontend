import { ReactNode } from 'react';
import classnames from 'classnames';

import { Icon, IconProps } from 'shared/ui/icons';

import styles from './styles.module.css';

export interface SideMenuContainerProps {
  border?: 'sea' | 'main' | 'mobile';
  size?: 'web' | 'mob';
  sizeIcon?: '88' | '196';
  children?: ReactNode;
  overlayVisible?: boolean;
  extClassName?: string;
}

export const SideMenuContainer = ({
  border = 'sea',
  size = 'web',
  sizeIcon = '196',
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
        <Icon color="white" icon="LockIcon" size={sizeIcon} />
      </div>
    )}
  </div>
);
