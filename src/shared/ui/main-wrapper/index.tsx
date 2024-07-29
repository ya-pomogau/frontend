import { FC, ReactNode } from 'react';
import styles from './styles.module.css';

interface MainWrapperProps {
  children?: ReactNode;
  extClassName?: string;
}

const MainWrapper: FC<MainWrapperProps> = ({ children, extClassName }) => {
  return <div className={`${styles.wrapper} ${extClassName}`}>{children}</div>;
};

export default MainWrapper;
