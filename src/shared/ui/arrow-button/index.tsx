import type { ButtonHTMLAttributes, ReactNode } from "react";
import classnames from "classnames";
import { ArrowIcon } from "../icons/arrow-icon";
import styles from "./styles.module.css";

interface ArrowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
  label: string;
  isPressed?: boolean;
  icon?: ReactNode;
}

export const ArrowButton = ({
  extClassName,
  disabled,
  label,
  isPressed,
  icon,
  ...props
}: ArrowButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles["arrow-button"],
      { [styles["arrow-button--pressed"]]: isPressed },
      extClassName,
      "text",
      "text_size_medium"
    )}
    disabled={disabled}
    {...props}
  >
    <div className={styles["arrow-buttonContent"]}>
      {icon || <ArrowIcon size="32" color="white" />}
      <span>{label}</span>
    </div>
  </button>
);
