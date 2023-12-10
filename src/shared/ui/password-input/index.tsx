/* eslint-disable react/display-name */
/* eslint-disable import/no-named-as-default-member */
import React, { useState } from 'react';

import { Icon } from '../icons';
import { Input } from '../input';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extClassName?: string;
  error?: boolean;
  errorText?: string | any;
  name?: string;
  register: any;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      label = 'Пароль',
      register,
      name,
      error,
      errorText,
      extClassName,
      placeholder = 'Введите пароль',
      ...props
    },
    ref
  ) => {
    const [visible, setVisibility] = useState(false);

    const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
      setVisibility(!visible);
    };

    return (
      <Input
        type={visible ? 'text' : 'password'}
        label={label}
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
        errorText={errorText}
        {...register(name)}
        {...props}
      />
    );
  }
);
