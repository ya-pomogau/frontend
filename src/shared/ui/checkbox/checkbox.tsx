import { ChangeEventHandler, FC } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface CheckboxProps {
  label: string;
  id: string;
  onClickCheckbox: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}
export const Checkbox: FC<CheckboxProps> = ({
  label,
  id,
  onClickCheckbox,
  checked,
}) => (
  <>
    <input
      className={classnames(styles.checkbox)}
      type="checkbox"
      id={id}
      name={id}
      onChange={onClickCheckbox}
      defaultChecked={checked}
    />
    <label
      htmlFor={id}
      className={classnames("text", "text_type_regular", "text_size_small")}
    >
      {label}
    </label>
  </>
);
