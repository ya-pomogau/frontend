/* eslint-disable react/display-name */

import { ReactElement, forwardRef } from 'react';
import classnames from 'classnames';

import styles from './submenu-button.module.css';

interface ISubmenuProps {
  text: string;
  icon: ReactElement;
  onClick: () => void;
}

export const SubmenuButton = forwardRef<HTMLDivElement, ISubmenuProps>(
  ({ text, icon, onClick }, ref) => {
    return (
      <div className={styles.block} onClick={onClick} ref={ref}>
        <div className={styles.settingIcon}>{icon}</div>
        <p className={classnames('text', 'm-0', 'p-0', styles.settingText)}>
          {text}
        </p>
      </div>
    );
  }
);
