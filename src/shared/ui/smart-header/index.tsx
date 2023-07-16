import { ReactNode, MouseEvent } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

interface SmartHeaderProps {
  extClassName?: string;
  settingText?: string;
  settingIcon?: ReactNode;
  filterText?: string;
  filterIcon?: ReactNode;
  onClick?: (e: MouseEvent) => void;
}
export const SmartHeader = ({
  extClassName,
  settingText,
  settingIcon,
  filterText,
  filterIcon,
  ...props
}: SmartHeaderProps) => (
  <div className={classnames(styles.smartHeader__container, extClassName)}>
    <div className={styles.smartHeader__block}>
      <div className={styles.settingIcon}>{settingIcon}</div>
      <p
        className={classnames(
          styles.settingText,
          'text',
          'text_size_large',
          'm-0',
          'p-0'
        )}
      >
        {settingText}
      </p>
    </div>
    <div className={styles.smartHeader__block}>
      <button className={styles.filterButton} type="button" {...props}>
        <p
          className={classnames(
            styles.filterText,
            'text',
            'text_size_medium',
            'm-0',
            'p-0'
          )}
        >
          {filterText}
        </p>
        {filterIcon}
      </button>
    </div>
  </div>
);
