import { ReactNode, MouseEvent, FC } from 'react';
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
export const SmartHeader: FC<SmartHeaderProps> = ({
  extClassName,
  settingText,
  settingIcon,
  filterText,
  filterIcon,
  ...props
}) => (
  <div className={classnames(styles.smartHeader__container, extClassName)}>
    <div className={styles.smartHeader__block}>
      <div className={styles.settingIcon}>{settingIcon}</div>
      <p className={classnames('text', 'm-0', 'p-0', styles.settingText)}>
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
