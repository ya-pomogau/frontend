import { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import MaskedInput from 'react-text-mask';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';

import styles from './styles.module.css';

const DEFAULT_MASK = [
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
];

export interface FormInputPhoneProps<FormInputs extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<FormInputs>;
  name: FieldPath<FormInputs>;
  rules?: RegisterOptions<FormInputs>;
  label?: string;
  extClassName?: string;
}

export const FormInputPhone = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  extClassName,
  placeholder,
}: FormInputPhoneProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className={extClassName} data-testid={'div'}>
      {label && (
        <label className={cn(styles.label, 'text')} htmlFor={field.name}>
          {label}
        </label>
      )}
      <div className={styles.container}>
        <MaskedInput
          id={field.name}
          name={field.name}
          data-testid={'input'}
          className={cn('phone', styles.input)}
          placeholder={placeholder}
          mask={DEFAULT_MASK}
          onChange={field.onChange}
        />
        {Boolean(error) && error?.message && (
          <span className={cn(styles.error, 'text')}>{error?.message}</span>
        )}
      </div>
    </div>
  );
};
