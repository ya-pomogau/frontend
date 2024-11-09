import { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

import { DefaultCheckboxIcon } from './checkbox-icon';

import styles from './styles.module.css';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  extClassName?: string;
  defaultChecked?: boolean;
  checked?: boolean;
}

const Checkbox = ({
  label,
  id,
  onChange,
  checked,
  defaultChecked,
  extClassName,
  name,
  ...props
}: CheckboxProps) => {
  return (
    <>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        name={name || id}
        onChange={onChange}
        checked={checked !== undefined ? checked : defaultChecked}
        value={id}
        {...props}
      />
      <label
        htmlFor={id}
        className={classnames('text', 'text_type_regular', extClassName)}
      >
        <div className={styles.tooltip}>
          Вы пока не можете выбрать эту категорию
        </div>
        <div className={styles.checkboxIconWrapper}>
          <span className={styles.checkboxIcon}>
            <DefaultCheckboxIcon />
          </span>
        </div>
        {label}
      </label>
    </>
  );
};

export default Checkbox;
