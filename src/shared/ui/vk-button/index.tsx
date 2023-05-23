import type { ButtonHTMLAttributes } from "react";
import classnames from "classnames";
import { VkIcon } from "../icons/vk-icon";
import styles from "./styles.module.css";

interface VkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  onClick?: () => void;
  label: string;
  disabled?: boolean;
}

export const VkButton = ({
  extClassName,
  label,
  disabled,
  ...props
}: VkButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles["vk-button"],
      extClassName,
      "text",
      "text_size_medium"
    )}
    disabled={disabled}
    {...props}
  >
    <div className={styles["vk-buttonContent"]}>
      <VkIcon size="24" color="white" />
      <span className={styles["vk-buttonLabel"]}>{label}</span>
    </div>
  </button>
);
