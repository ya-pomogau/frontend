import React from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import styles from './styles.module.css';

type TIconArrow = {
  extClassName?: string;
};

const IconArrow = ({ extClassName }: TIconArrow) => (
  <svg
    className={extClassName}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#818C99"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 14.1983L6.64021 9.7318C6.21593 9.37824 5.58537 9.43556 5.2318 9.85984C4.87824 10.2841 4.93556 10.9147 5.35984 11.2682L11.3598 16.2682C11.7307 16.5773 12.2694 16.5773 12.6402 16.2682L18.6402 11.2682C19.0645 10.9147 19.1218 10.2841 18.7682 9.85984C18.4147 9.43556 17.7841 9.37824 17.3598 9.7318L12 14.1983Z" />
  </svg>
);

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  extClassName?: string;
  selectedValue?: string;
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
          <option disabled value="">
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option value={option.value} key={index}>
              {option.label}
            </option>
          ))}
        </select>
        <div className={styles.icon}>
          <IconArrow />
        </div>
      </div>
    );
  }
);
