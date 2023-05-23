import type { ButtonHTMLAttributes, ReactNode } from "react";
import classnames from "classnames";
import { PhoneIcon } from "../icons/phone-icon";
import { EmptyMessageIcon } from "../icons/empty-message-icon";
import { LocationIcon } from "../icons/location-icon";
import { AddIcon } from "../icons/add-icon";
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
const defautlIcons = {
  phone: <PhoneIcon size="24" color="white" />,
  message: <EmptyMessageIcon size="24" color="white" />,
  location: <LocationIcon size="54" color="white" />,
  add: <AddIcon size="66" color="white" />,
  default: null,
};

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
      { [styles[`round-button--${buttonType}--pressed`]]: isPressed },
      extClassName
    )}
    disabled={disabled}
    {...props}
  >
    <div className={styles["round-buttonImg"]}>
      {customIcon || defautlIcons[buttonType]}
    </div>
  </button>
);
