import type { ButtonHTMLAttributes, ReactNode } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
  customIcon?: ReactNode;
  text: string;
}

export const CardButton = ({
  extClassName,
  customIcon,
  text,
  ...props
}: CardButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles["card-button"],
      extClassName,
      "text",
      "text_size_medium"
    )}
    {...props}
  >
    <div className={styles["card-buttonContent"]}>
      <div className={styles["card-buttonImg"]}>{customIcon}</div>
      <span className={styles["card-buttonLabel"]}>{text}</span>
    </div>
  </button>
);
