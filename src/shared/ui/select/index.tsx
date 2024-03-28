import React from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';
import { AccordionIconArrow } from '../icons/accordion-arrow';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  extClassName?: string;
  selectedValue?: string;
  selectPlaceholder?: boolean;
}

// eslint-disable-next-line import/no-named-as-default-member, react/display-name
export const Select = React.forwardRef<HTMLSelectElement, Props>(
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
          className={cn(styles.select, 'text', 'text_size_medium')}
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
        <div className={styles.icon}>
          <AccordionIconArrow />
        </div>
      </div>
    );
  }
);
