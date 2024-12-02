import { ImgHTMLAttributes, useState } from 'react';
import classnames from 'classnames';

import defaultAvatar from './placeholder.svg';
import skeleton from './skeleton.svg';
import styles from './styles.module.css';

type avatarVariant =
  | 'mainProfile'
  | 'mapTask'
  | 'taskList'
  | 'headerAvatar'
  | 'conflictList'
  | 'userCard'
  | 'userList'
  | 'chatAvatar'
  | 'chatTitle'
  | 'editProfile'
  | 'createTask'
  | 'blog';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  variant: avatarVariant;
  extSize?: number;
}

export const Avatar = ({
  extClassName,
  avatarLink,
  avatarName,
  variant,
  extSize,
  ...props
}: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState<string>(skeleton);

  const handleError = () => {
    setImgSrc(defaultAvatar);
  };

  const handleLoad = () => {
    setImgSrc(avatarLink);
  };

  const avatarStyles = classnames(styles.avatar, styles[variant], extClassName);

  return (
    <img
      src={imgSrc}
      alt={avatarName}
      className={avatarStyles}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
      style={{ width: extSize }}
    />
  );
};
