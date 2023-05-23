import type { ButtonHTMLAttributes, ReactNode } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  buttonType: "phone" | "message" | "location" | "add" | "default";
  disabled?: boolean;
  onClick?: () => void;
  isPressed?: boolean;
  customIcon?: ReactNode;
  size?: "small" | "medium" | "large";
}

export const RoundButton = ({
  extClassName,
  buttonType,
  disabled,
  isPressed,
  customIcon,
  size,
  ...props
}: RoundButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles["round-button"],
      styles[`round-button--${buttonType}`],
      styles[`round-button--${size}`],
      styles[isPressed ? `round-button--${buttonType}--pressed` : ""],
      styles[customIcon ? "round-button--default" : ""],
      extClassName
    )}
    disabled={disabled}
    {...props}
  >
    {customIcon}
  </button>
);
