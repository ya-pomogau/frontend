import { ReactElement, ReactNode, MouseEvent } from 'react';

import classnames from 'classnames';

import styles from './styles.module.css';

interface SmartHeaderProps {
  text: string;
  icon: ReactElement;
  filter?: ReactElement;
  extClassName?: string;
}
export const SmartHeader = ({
  text,
  icon,
  filter,
  extClassName,
}: SmartHeaderProps) => (
  <div className={classnames(styles.smartHeader__container, extClassName)}>
    <div className={styles.smartHeader__block}>
      <div className={styles.settingIcon}>{icon}</div>
      <p className={classnames('text', 'm-0', 'p-0', styles.settingText)}>
        {text}
      </p>
    </div>
    {filter}
  </div>
);
