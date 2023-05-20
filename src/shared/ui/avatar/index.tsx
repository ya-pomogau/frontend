import type { ImgHTMLAttributes } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface imageProps extends ImgHTMLAttributes<HTMLImageElement> {
  extClassName?: string;
  avatarLink: string;
  avatarSize: "small" | "medium" | "large" | "elarge";
  avatarName: string;
}

export const Avatar = ({
  extClassName,
  avatarSize = "elarge",
  avatarLink = "https://i.pravatar.cc/300",
  avatarName,
  ...props
}: imageProps) => (
  <img
    src={avatarLink}
    alt={avatarName}
    className={classnames(
      styles.avatar,
      styles[`avatar--${avatarSize}`],
      extClassName
    )}
    {...props}
  />);
