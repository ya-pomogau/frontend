import {
  InputHTMLAttributes,
  forwardRef,
  ReactNode,
  MouseEvent,
  ChangeEvent,
  useState,
} from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';
import MaskedInput from 'react-text-mask';

export interface InputPhoneProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  extClassName?: string;
  error?: boolean;
  errorText?: string;
  customIcon?: ReactNode;
  onIconClick?: (e: MouseEvent<HTMLDivElement>) => void;
  extClassNameInput?: string;
}

// eslint-disable-next-line react/display-name
export const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(
  (
    {
      type,
      onChange,
      label,
      extClassName,
      extClassNameInput,
      placeholder,
      error = false,
      errorText = 'Некорректный номер телефона',
      customIcon,
      onIconClick,
    },
    ref
  ) => {
    const id = nanoid();
    const [isValid, setIsValid] = useState<boolean>(true);

    const validatePhoneNumber = (value: string) => {
      if (value.trim() === '') {
        return true;
      }
      const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
      return phoneRegex.test(value);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const valid = validatePhoneNumber(value);

      setIsValid(valid);

      if (onChange) {
        onChange(e);
      }
    };

    const inputClass =
      !isValid || error
        ? styles.input_error
        : extClassNameInput
        ? extClassNameInput
        : styles.input;

    const iconClass = !isValid || error ? styles.icon_error : styles.icon;

    return (
      <div className={extClassName} data-testid={'div'}>
        {label && (
          <label className={cn(styles.label, 'phone')} htmlFor={id}>
            {label}
          </label>
        )}
        <div ref={ref} className={styles.container}>
          <MaskedInput
            type={type}
            data-testid={'input'}
            className={cn('phone', inputClass)}
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
            onChange={handleChange}
          />
          {(error || !isValid) && (
            <span className={cn(styles.error, 'text')}>{errorText}</span>
          )}
          <div className={iconClass} onClick={onIconClick}>
            {customIcon}
          </div>
        </div>
      </div>
    );
  }
);
