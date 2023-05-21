import React, { ChangeEventHandler, FC, InputHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  onClickCheckbox: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  icon?: React.JSX.Element;
}
export const Checkbox: FC<CheckboxProps> = ({
  icon,
  label,
  id,
  onClickCheckbox,
  checked,
  ...props
}) => (
  <>
    <input
      className={classnames(styles.checkbox)}
      type="checkbox"
      id={id}
      name={id}
      onChange={onClickCheckbox}
      defaultChecked={checked}
      {...props}
    />
    <label
      htmlFor={id}
      className={classnames("text", "text_type_regular", "text_size_small")}
    >
      <div className={classnames(styles["checkbox-icon--wrapper"])}>
        <span className={classnames(styles["checkbox-icon"])}>{icon}</span>
      </div>
      {label}
    </label>
  </>
);
