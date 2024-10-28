import { ReactElement } from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';
import { Typography } from '../typography';

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
      <Typography
        tag={'h2'}
        color={'primary'}
        fontFamily={'primaryFont'}
        variant={'titleResize'}
        content={text}
      />
    </div>
    {filter}
  </div>
);
