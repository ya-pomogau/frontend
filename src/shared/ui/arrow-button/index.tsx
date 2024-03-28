import type { ButtonHTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

import { ArrowIcon } from '../icons/arrow-icon';

import styles from './styles.module.css';

interface ArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
  label: string;
  customIcon?: ReactNode;
}

export const ArrowButton = ({
  extClassName,
  label,
  customIcon,
  ...props
}: ArrowButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles['arrow-button'],
      extClassName,
      'text',
      'text_size_medium'
    )}
    {...props}
  >
    <div className={styles['arrow-buttonContent']}>
      {customIcon || <ArrowIcon size="32" color="white" />}
      <span>{label}</span>
    </div>
  </button>
);
