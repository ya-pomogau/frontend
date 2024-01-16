/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  extClassName?: string;
  maxLength?: number;
}

// eslint-disable-next-line react/display-name
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      name,
      onChange,
      label,
      extClassName,
      placeholder,
      maxLength,
      ...props
    },
    ref
  ) => {
    const id = nanoid();

    const inputClass = label ? styles.input : styles.input_without_label;

    const sign = Math.max((maxLength ?? 0) - (value?.length ?? 0), 0);

    return (
      <div className={cn(styles.container, extClassName)}>
        {label && (
          <label className={cn(styles.label, 'text')} htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          value={value}
          name={name}
          onChange={onChange}
          className={cn(inputClass, 'text', 'text_size_medium')}
          placeholder={placeholder}
          id={id}
          maxLength={maxLength}
          {...props}
        />
        {maxLength && (
          <p className={cn(styles.sign, 'text', 'm-0')}>{`${sign} знаков`}</p>
        )}
      </div>
    );
  }
);
