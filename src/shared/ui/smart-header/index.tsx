import { ReactElement } from 'react';

import classnames from 'classnames';

import styles from './styles.module.css';
import { Submenu } from 'features/submenu';

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
}: SmartHeaderProps) => {
  return (
    <div className={classnames(styles.smartHeader__container, extClassName)}>
      <Submenu text={text} icon={icon} />
      {filter}
    </div>
  );
};
