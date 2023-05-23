import type { ButtonHTMLAttributes, ReactNode } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
  isPressed?: boolean;
  icon?: ReactNode;
  label: string;
}

export const CardButton = ({
  extClassName,
  isPressed,
  icon,
  label,
  ...props
}: CardButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles["card-button"],
      styles[isPressed ? "card-button--pressed" : ""],
      extClassName,
      "text",
      "text_size_medium"
    )}
    {...props}
  >
    <div className={styles["card-button-content"]}>
      <div className={styles["card-button-img"]}>{icon}</div>
      <div className={styles["card-button-label"]}>{label}</div>
    </div>
  </button>
);
