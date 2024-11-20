import cn from 'classnames';
import { ChangeEvent, forwardRef, TextareaHTMLAttributes, useId } from 'react';
import { type FieldError as FieldErrorEntities } from 'react-hook-form';

import styles from './styles.module.css';
import { FieldError, Typography } from '../../ui';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  extClassName?: string;
  maxLength?: number;
  error?: FieldErrorEntities;
}

// eslint-disable-next-line react/display-name
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      name,
      onChange,
      label,
      extClassName,
      placeholder,
      maxLength,
      error,
      ...props
    },
    ref
  ) => {
    const id = useId();

    const inputClass = label ? styles.input : styles.input_without_label;

    const sign = Math.max((maxLength ?? 0) - (value?.length ?? 0), 0);

    return (
      <div className={cn(styles.container, extClassName)}>
        {label && (
          <label className={cn(styles.label, 'text')} htmlFor={id}>
            {label}
          </label>
        )}

        <div className={styles.textarea}>
          <textarea
            ref={ref}
            value={value}
            name={name}
            onChange={onChange}
            className={cn(inputClass, 'text', {
              [styles.input_error]: !!error,
            })}
            placeholder={placeholder}
            id={id}
            maxLength={maxLength}
            {...props}
          />
          {maxLength && (
            <Typography
              color={'interface-additional'}
              fontFamily={'secondaryFont'}
              variant={'support'}
              content={`${sign} знаков`}
              extraClass={styles.sign}
            />
          )}
        </div>

        <FieldError message={error?.message} />
      </div>
    );
  }
);
