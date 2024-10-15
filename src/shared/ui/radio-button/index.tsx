import { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

import styles from './style.module.css';
import { Label } from '../label';

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RadioButton = ({
  label,
  id,
  name,
  onChange,
  checked,
  ...props
}: RadioButtonProps) => (
  <>
    <input
      type="radio"
      id={id}
      onChange={onChange}
      name={name}
      checked={checked}
      className={styles.radiobutton}
      {...props}
    />
    <Label
      htmlFor={id}
      extClassName={classnames(
        styles.fakeRadiobutton,
        'text',
        'text_type_regular',
        'text_size_small'
      )}
    >
      {label}
    </Label>
  </>
);

export default RadioButton;
