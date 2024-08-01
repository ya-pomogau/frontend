import { FC, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';

interface MainWrapperProps {
  children?: ReactNode;
  extClassName?: string;
}

const MainWrapper: FC<MainWrapperProps> = ({ children, extClassName }) => {
  return (
    <div className={classnames`${styles.wrapper} ${extClassName}`}>
      {children}
    </div>
  );
};

export default MainWrapper;
