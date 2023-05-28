import { ReactNode } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface TooltipProps {
  extClassName?: string;
  visible?: boolean;
  children: ReactNode;
  pointerPosition?: "right" | "center";
}

export const Tooltip = ({
  extClassName,
  visible,
  children,
  pointerPosition = "right",
}: TooltipProps) => (
  <div
    className={classnames(styles.tooltip, extClassName, {
      [styles["tooltip--visible"]]: visible,
    })}
  >
    <div
      className={classnames(
        styles.pointer,
        styles[`pointer--${pointerPosition}`]
      )}
    />
    {children}
  </div>
);
