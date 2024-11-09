import { ImgHTMLAttributes, useState } from 'react';
import classnames from 'classnames';

import { DefaultAvatar } from 'entities';

import styles from './styles.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  isTaskAvatar: boolean;
}

export const Avatar = ({
  extClassName,
  avatarLink,
  avatarName,
  isTaskAvatar,
  ...props
}: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(avatarLink || null);

  const handleError = () => {
    setImgSrc(null);
  };

  return imgSrc ? (
    <img
      src={imgSrc}
      alt={avatarName}
      className={classnames(styles.avatar, extClassName)}
      onError={handleError}
      {...props}
    />
  ) : (
    <DefaultAvatar isTaskAvatar={isTaskAvatar} />
  );
};
