/* eslint-disable react/display-name */
/* eslint-disable import/no-named-as-default-member */
import React, { useState } from 'react';

import { Icon } from '../icons';
import { Input } from '../input';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extClassName?: string;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      value,
      label = 'Пароль',
      name,
      onChange,
      extClassName,
      placeholder = 'Введите пароль',
      ...props
    },
    ref
  ) => {
    const [visible, setVisibility] = useState(false);
    const [error, setError] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const validateField = (value: string) => {
      setError(value.length < 2);
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value) {
        validateField(e.target.value);
      } else {
        setError(false);
      }
    };

    const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
      setVisibility(!visible);
    };

    return (
      <Input
        required
        onBlur={onBlur}
        type={visible ? 'text' : 'password'}
        value={value}
        label={label}
        name={name as string}
        onChange={onChange}
        placeholder={placeholder}
        extClassName={extClassName}
        onIconClick={handleIconClick}
        customIcon={
          visible ? (
            <Icon color="blue" icon="PasswordCloseIcon" size="32" />
          ) : (
            <Icon color="blue" icon="PasswordOpenIcon" size="32" />
          )
        }
        error={error}
        errorText={'Пароль не может быть таким коротким'}
      />
    );
  }
);
