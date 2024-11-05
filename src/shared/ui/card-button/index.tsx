import type { ButtonHTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

import { Typography } from '../../ui';

import styles from './styles.module.css';

interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
  customIcon?: ReactNode;
  text: string;
  isActive?: boolean;
}

export const CardButton = ({
  extClassName,
  customIcon,
  text,
  isActive,
  ...props
}: CardButtonProps) => {
  return (
    <button
      type="button"
      className={classnames(
        styles['card-button'],
        { [styles['card-button-active']]: isActive },
        extClassName
      )}
      {...props}
    >
      <div className={styles['card-buttonContent']}>
        <div className={styles['card-buttonImg']}>{customIcon}</div>
        <Typography
          tag={'span'}
          color={'white'}
          variant={'paragraphResize'}
          content={text}
          extraClass={styles['card-buttonLabel']}
        />
      </div>
    </button>
  );
};
