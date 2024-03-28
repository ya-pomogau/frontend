import type { ButtonHTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';
import { Loader } from '../loader';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  buttonType: 'primary' | 'secondary' | 'partial';
  actionType?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  label?: string;
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  customIcon?: ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  extClassName,
  buttonType,
  actionType,
  label,
  isLoading,
  size = 'small',
  customIcon,
  ...props
}: ButtonProps) => {
  const isExtraLarge = size === 'extraLarge';
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={actionType}
      className={classnames(
        styles.button,
        styles[`button--${buttonType}`],
        styles[`button--${size}`],
        styles[`button--${buttonType}--${size}`],
        extClassName,
        'text',
        'text_size_small',
        { text_size_medium: isExtraLarge }
      )}
      {...props}
    >
      <div
        className={classnames(
          styles.buttonContent,
          styles[`buttonContent--${buttonType}`],
          { [styles[`buttonContent--${size}`]]: isExtraLarge },
          { [styles['buttonContent--withoutLabel']]: !label }
        )}
      >
        {customIcon}
        {isLoading ? <Loader /> : <span>{label}</span>}
      </div>
    </button>
  );
};
