/* eslint-disable react/display-name */
/* eslint-disable import/no-named-as-default-member */
import { useMemo, InputHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';
import MaskedInput from 'react-text-mask';

export interface InputPhoneProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  extClassName?: string;
  error?: boolean;
  setValue: (phone: string) => void;
  errorText?: string;
  customIcon?: React.ReactNode;
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  extClassNameInput?: string;
}

export const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(
  (
    {
      type,
      name,
      onChange,
      label,
      extClassName,
      extClassNameInput,
      placeholder,
      error,
      errorText,
      customIcon,
      onIconClick,
      setValue,
      value,
      ...props
    },
    ref
  ) => {
    const id = nanoid();

    const errorToRender = useMemo(
      () =>
        error && errorText ? (
          <span className={cn(styles.error, 'text')}>{errorText}</span>
        ) : null,
      [error, errorText]
    );

    const inputClass = error
      ? styles.input_error
      : extClassNameInput
      ? extClassNameInput
      : styles.input;

    const iconClass = error ? styles.icon_error : styles.icon;

    function cleanPhoneNumber(phoneNumber: string) {
      return phoneNumber.replace(/[^0-9]/g, '');
    }

    return (
      <div className={extClassName} data-testid={'div'}>
        {label && (
          <label className={cn(styles.label, 'phone')} htmlFor={id}>
            {label}
          </label>
        )}
        <div ref={ref} className={styles.container}>
          <MaskedInput
            data-testid={'input'}
            type={type}
            name={name}
            className={cn('phone', inputClass)}
            onChange={(e) => setValue(cleanPhoneNumber(e.target.value))}
            placeholder={placeholder}
            id={id}
            mask={[
              '+',
              '7',
              ' ',
              '(',
              /\d/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
            ]}
            {...props}
          />
          {errorToRender}
          <div className={iconClass} onClick={onIconClick}>
            {customIcon}
          </div>
        </div>
      </div>
    );
  }
);
