import { InputHTMLAttributes, ReactNode, MouseEvent } from 'react';
import cn from 'classnames';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';

import styles from './styles.module.css';

export interface FormInputProps<FormInputs extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<FormInputs>;
  name: FieldPath<FormInputs>;
  rules: RegisterOptions<FormInputs>;
  label?: string;
  customIcon?: ReactNode;
  onIconClick?: (e: MouseEvent<HTMLDivElement>) => void;
  extClassName?: string;
}

export const FormInput = <T extends FieldValues>({
  type,
  name,
  control,
  rules,
  label,
  extClassName,
  placeholder,
  customIcon,
  onIconClick,
}: FormInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const iconClass = error ? styles.icon_error : styles.icon;

  return (
    <div className={extClassName} data-testid={'div'}>
      {label && (
        <label className={cn(styles.label, 'text')} htmlFor={field.name}>
          {label}
        </label>
      )}
      <div className={styles.container}>
        <input
          data-testid={'input'}
          type={type}
          id={field.name}
          name={field.name}
          onChange={field.onChange}
          value={field.value}
          ref={field.ref}
          className={cn('text', styles.input)}
          placeholder={placeholder}
        />
        {Boolean(error) && error?.message && (
          <span className={cn(styles.error, 'text')}>{error?.message}</span>
        )}
        <div className={iconClass} onClick={onIconClick}>
          {customIcon}
        </div>
      </div>
    </div>
  );
};
