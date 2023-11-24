import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';
import HeartIcon from './assets/heart-icon.png';

interface InformerProps {
  extClassName?: string;
  text?: string;
  icon?: React.ReactNode;
  isMobile?: boolean;
}

export const Informer = ({
  text,
  extClassName,
  icon,
  isMobile,
}: InformerProps) => (
  <div
    className={classnames(
      styles.informer,
      { [styles['informer--withText']]: text },
      extClassName
    )}
  >
    <div
      className={`${styles['informer-imgBlock']} ${
        isMobile && styles['informer-imgBlock_mobile']
      }`}
    >
      {icon || (
        <img
          src={HeartIcon}
          alt="Сердeчное рукопожатие"
          className={`${styles.informerImg} ${
            isMobile && styles.informerImgMobile
          }`}
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
