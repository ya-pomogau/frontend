import React from "react";
import classnames from "classnames";
import { Icon } from "../icons";
import styles from "./styles.module.css";

export interface ButtonContainerProps {
  border?: "sea" | "main" | "mobile";
  size?: "web" | "mob";
  children?: React.ReactNode;
  auth?: boolean;
  extClassName?: string;
}

export const ButtonContainer: React.FC<ButtonContainerProps> = ({
  border = "sea",
  size = "web",
  children,
  auth,
  extClassName
}) => (
  <div
    className={classnames(
      styles.button__container,
      styles[`button__container--${size}`],
      styles[`button__container--${border}`],
      extClassName
    )}
    style={{ border }}
  >
    {children}
    {!auth && (
      <div className={styles.overlay}>
        <Icon color="white" icon="LockIcon" size="196" />
      </div>
    )}
  </div>
);
