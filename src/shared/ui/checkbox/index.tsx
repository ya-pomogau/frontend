import { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

import { DefaultCheckboxIcon } from './checkbox-icon';

import styles from './styles.module.css';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  extClassName?: string;
}

const Checkbox = ({
  label,
  id,
  onChange,
  checked,
  extClassName,
  name,
  ...props
}: CheckboxProps) => (
  <>
    <input
      className={styles.checkbox}
      type="checkbox"
      id={id}
      name={name || id}
      onChange={onChange}
      checked={checked}
      value={id}
      {...props}
    />
    <label
      htmlFor={id}
      className={classnames(
        'text',
        'text_type_regular',
        'text_size_small',
        extClassName
      )}
    >
      <div className={styles.checkboxIconWrapper}>
        <span className={styles.checkboxIcon}>
          <DefaultCheckboxIcon />
        </span>
      </div>
      {label}
    </label>
  </>
);

export default Checkbox;
