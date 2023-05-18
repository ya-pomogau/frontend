import type { ButtonHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  extClassName,
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? styles["storybook-button--primary"]
    : styles["storybook-button--secondary"];
  return (
    <button
      type="button"
      className={classnames(
        styles["storybook-button"],
        styles[`storybook-button--${size}`],
        mode,
        extClassName
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
