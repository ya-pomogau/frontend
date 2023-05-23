import type { ButtonHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  buttonType: "close" | "edit" | "confirm";
  onClick?: () => void;
  disabled?: boolean;
  isPressed?: boolean;
}

export const SquareButton = ({
  extClassName,
  buttonType,
  disabled,
  isPressed,
  ...props
}: SquareButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles["square-button"],
      styles[`square-button--${buttonType}`],
      styles[isPressed ? `square-button--${buttonType}--pressed` : ""],
      extClassName
    )}
    disabled={disabled}
    {...props}
  />
);
