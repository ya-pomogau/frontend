import type { ReactNode, ButtonHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";
import { EditIcon } from "../icons/edit-icon";
import { CloseIcon } from "../icons/closee-icon";
import { DoneIcon } from "../icons/done-icon";

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  extClassName?: string;
  buttonType: "close" | "edit" | "confirm";
  onClick?: () => void;
  disabled?: boolean;
  isPressed?: boolean;
  icon?: ReactNode;
}

const defautlIcons = {
  close: <CloseIcon size="24" color="white" />,
  edit: <EditIcon size="24" color="white" />,
  confirm: <DoneIcon size="24" color="white" />,
};

export const SquareButton = ({
  extClassName,
  buttonType,
  disabled,
  isPressed,
  icon,
  ...props
}: SquareButtonProps) => (
  <button
    type="button"
    className={classnames(
      styles["square-button"],
      styles[`square-button--${buttonType}`],
      { [styles[`square-button--${buttonType}--pressed`]]: isPressed },
      extClassName
    )}
    disabled={disabled}
    {...props}
  >
    <div className={styles["square-buttonImg"]}>
      {icon || defautlIcons[buttonType]}
    </div>
  </button>
);
