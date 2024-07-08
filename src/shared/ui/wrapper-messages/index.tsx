import { ReactNode } from 'react';

import { Informer } from '../informer';
import styles from './styles.module.css';

interface WrapperMessageProps {
  children?: ReactNode;
  information: boolean;
  title: string;
}

export default function WrapperMessage({
  children,
  information,
  title,
}: WrapperMessageProps) {
  return (
    <div className={styles.boxMessage}>
      {children && information ? (
        children
      ) : (
        <Informer text={title} extClassName={styles.informer} />
      )}
    </div>
  );
}
