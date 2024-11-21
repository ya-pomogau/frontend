import { ImgHTMLAttributes, useState } from 'react';
import classnames from 'classnames';

import defaultAvatar from './placeholder.svg';
import styles from './styles.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  isTaskAvatar?: boolean;
}

export const Avatar = ({
  extClassName,
  avatarLink,
  avatarName,
  isTaskAvatar,
  ...props
}: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState<string>(avatarLink);

  const handleError = () => {
    setImgSrc(defaultAvatar);
  };

  return (
    <img
      src={imgSrc}
      alt={avatarName}
      className={classnames(styles.avatar, extClassName)}
      onError={handleError}
      {...props}
    />
  );
};
