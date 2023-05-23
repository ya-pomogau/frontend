import React from "react";
import classnames from "classnames";
import styles from "./styles.module.css";
import HeartIcon from "./assets/heart-icon.svg";

interface InformerProps {
  extClassName?: string;
  text?: string;
  icon?: React.ReactNode;
}

export const Informer = ({ text, extClassName, icon }: InformerProps) => (
  <div
    className={classnames(
      styles.informer,
      styles[text ? "informer--with-text" : ""],
      extClassName
    )}
  >
    <div className={styles["informer-img-block"]}>
      {icon || <img src={HeartIcon} alt="Сердeчное рукопожатие" />}
    </div>
    <span
      className={classnames("text", "text_size_large", styles["informer-text"])}
    >
      {text}
    </span>
  </div>
);
