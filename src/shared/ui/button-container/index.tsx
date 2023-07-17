import { ReactNode } from 'react';
import classnames from 'classnames';

import { Icon } from '../icons';

import styles from './styles.module.css';

export interface ButtonContainerProps {
  border?: 'sea' | 'main' | 'mobile';
  size?: 'web' | 'mob';
  children?: ReactNode;
  auth?: boolean;
  extClassName?: string;
}

export const ButtonContainer = ({
  border = 'sea',
  size = 'web',
  children,
  auth,
  extClassName,
}: ButtonContainerProps) => (
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
    {!auth && (
      <div className={styles.overlay}>
        <Icon color="white" icon="LockIcon" size="196" />
      </div>
    )}
  </div>
);
