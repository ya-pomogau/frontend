import type { ButtonHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface ArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  isPressed?: boolean;
}

export const ArrowButton = ({
  extClassName,
  disabled,
  label,
  isPressed,
  ...props
}: ArrowButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles["arrow-button"],
      styles[isPressed ? `arrow-button--pressed` : ""],
      extClassName,
      "text",
      "text_size_medium"
    )}
    disabled={disabled}
    {...props}
  >
    <div className={styles["arrow-button-content"]}>{label}</div>
  </button>
);
