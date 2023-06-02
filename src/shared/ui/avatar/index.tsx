import type { ImgHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface imageProps extends ImgHTMLAttributes<HTMLImageElement> {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  size?: "medium" | "large";
}

export const Avatar = ({
  extClassName,
  avatarLink = "https://i.pravatar.cc/300",
  avatarName,
  size = "medium",
  ...props
}: imageProps) => (
  <img
    src={avatarLink}
    alt={avatarName}
    className={classnames(
      styles.avatar,
      styles[`avatar--${size}`],
      extClassName
    )}
    {...props}
  />
);
