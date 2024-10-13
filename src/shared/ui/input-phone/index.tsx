import {
  InputHTMLAttributes,
  forwardRef,
  ReactNode,
  MouseEvent,
  ChangeEvent,
} from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';
import MaskedInput from 'react-text-mask';
import { Label } from '../label';
import { ErrorText } from '../errorText';

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
      error,
      errorText,
      customIcon,
      onIconClick,
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
          <Label htmlFor={id}>
            {label}
          </Label>
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
            onChange={onChange}
          />
          {errorText && <ErrorText error = {errorText} />}          
          <div className={iconClass} onClick={onIconClick}>
            {customIcon}
          </div>
        </div>
      </div>
    );
  }
);
