import { FC, InputHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";
import { DefaultCheckboxIcon } from "./checkbox-icon";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const Checkbox: FC<CheckboxProps> = ({
  label,
  id,
  onChange,
  checked,
  ...props
}) => (
  <>
    <input
      className={styles.checkbox}
      type="checkbox"
      id="233"
      name="233"
      onChange={onChange}
      checked={checked}
      {...props}
    />
    <label
      htmlFor="233"
      className={classnames("text", "text_type_regular", "text_size_medium")}
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
