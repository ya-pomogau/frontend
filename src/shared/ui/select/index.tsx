import { ChangeEvent, forwardRef, SelectHTMLAttributes } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';
import { AccordionIconArrow } from '../icons/accordion-arrow';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  extClassName?: string;
  selectedValue?: string;
  selectPlaceholder?: boolean;
  error?: boolean;
  errorText?: string;
}

// eslint-disable-next-line import/no-named-as-default-member, react/display-name
export const Select = forwardRef<HTMLSelectElement, Props>(
  (
    {
      options,
      placeholder,
      name,
      onChange,
      label,
      extClassName,
      selectedValue,
      selectPlaceholder,
      error,
      errorText = 'Ошибка выбора задачи',
      ...props
    },
    ref
  ) => {
    const id = nanoid();

    return (
      <div className={cn(styles.container, extClassName)}>
        {label && (
          <label className={cn(styles.label, 'text')} htmlFor={id}>
            {label}
          </label>
        )}
        <select
          ref={ref}
          name={name}
          defaultValue={selectedValue}
          className={cn(styles.select, 'text', 'text_size_medium', {
            [styles.select_error]: error,
          })}
          onChange={onChange}
          id={id}
          {...props}
        >
          <option disabled value="" selected={selectPlaceholder}>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option value={option.value} key={index}>
              {option.label}
            </option>
          ))}
        </select>
        <div className={cn(styles.icon, { [styles.icon_error]: error })}>
          <AccordionIconArrow />
        </div>
        {error && <span className={cn(styles.error, 'text')}>{errorText}</span>}
      </div>
    );
  }
);
