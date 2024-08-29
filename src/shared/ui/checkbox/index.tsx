import { InputHTMLAttributes, useState, useEffect } from 'react';
import classnames from 'classnames';

import { DefaultCheckboxIcon } from './checkbox-icon';

import styles from './styles.module.css';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  extClassName?: string;
  defaultChecked?: boolean;
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
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  useEffect(() => {
    setIsChecked(defaultChecked || false);
  }, [defaultChecked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        name={name || id}
        onChange={handleChange}
        checked={checked ?? isChecked}
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
