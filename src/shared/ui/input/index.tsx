/* eslint-disable react/display-name */
/* eslint-disable import/no-named-as-default-member */
import { InputHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';
import { Typography } from '../../ui';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
  customIcon?: React.ReactNode;
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  extClassNameInput?: string;
  extClassNameCustomIcon?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      onChange,
      label,
      extClassName,
      extClassNameInput,
      extClassNameCustomIcon,
      placeholder,
      error,
      errorText,
      customIcon,
      onIconClick,
      ...props
    },
    ref
  ) => {
    const id = nanoid();

    const inputClass = error
      ? styles.input_error
      : extClassNameInput
      ? extClassNameInput
      : styles.input;

    const iconClass = error ? styles.icon_error : styles.icon;

    return (
      <div className={extClassName} data-testid={'div'}>
        {label && (
          <label className={cn(styles.label, 'text')} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={styles.container}>
          <input
            data-testid={'input'}
            ref={ref}
            type={type}
            name={name}
            className={cn('text', inputClass)}
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            {...props}
          />
          <Typography
            tag={'span'}
            color={'orange'}
            variant={'support'}
            content={errorText === ' ' ? <span>&nbsp;</span> : errorText}
            extraClass={styles.error}
          />
          <div className={cn(iconClass, extClassNameCustomIcon)} onClick={onIconClick}>
            {customIcon}
          </div>
        </div>
      </div>
    );
  }
);
