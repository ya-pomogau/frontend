import React from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface ButtonContainerProps {
  border?: "sea" | "main" | "mobile";
  size?: "web" | "mob";
  children?: React.ReactNode;
}

export const ButtonContainer: React.FC<ButtonContainerProps> = ({
  border = "sea",
  size = "web",
  children,
}) => (
  <div
    className={classnames(
      styles.button__container,
      styles[`button__container--${size}`],
      styles[`button__container--${border}`]
    )}
    style={{ border }}
  >
    {children}
  </div>
);
