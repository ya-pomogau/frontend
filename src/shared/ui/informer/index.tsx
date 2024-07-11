import classnames from 'classnames';

import styles from './styles.module.css';
import HeartIcon from './assets/heart-icon.png';
import { ReactNode } from 'react';

interface InformerProps {
  extClassName?: string;
  text?: string;
  icon?: ReactNode;
}

export const Informer = ({ text, extClassName, icon }: InformerProps) => (
  <div
    className={classnames(
      styles.informer,
      { [styles['informer--withText']]: text },
      extClassName
    )}
  >
    <div className={styles['informer-imgBlock']}>
      {icon || (
        <img
          src={HeartIcon}
          alt="Сердeчное рукопожатие"
          className={styles.informerImg}
        />
      )}
    </div>
    <span
      className={classnames('text', 'text_size_large', styles.informerText)}
    >
      {text}
    </span>
  </div>
);
