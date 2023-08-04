/* eslint-disable react/display-name */
/* eslint-disable import/no-named-as-default-member */
import React, { useState } from 'react';

//import styles from './styles.module.css';

import { Icon } from '../icons';
import { Input, InputProps } from '../input';

interface PasswordInputProps extends InputProps {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extClassName?: string;
  customIcon: React.ReactNode;
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      value,
      label,
      name,
      onChange,
      extClassName,
      placeholder = 'Пароль',
      customIcon,
      onIconClick,
      ...props
    },
    ref
  ) => {
    const [visible, setVisibility] = useState(false);
    const [error, setError] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const validateField = (value: string) => {
      setError(value.length < 6);
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
        // пропсы ошибки работают только на уровне Input, но я не вижу смысла их переносить "выше" в рамках логики приложения
        error={error}
        errorText={'Вы ввели неправильный пароль'}
      />
    );
  }
);
