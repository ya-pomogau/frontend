import { ImgHTMLAttributes, useEffect, useState } from 'react';
import classnames from 'classnames';

import defaultAvatar from './placeholder.svg';
import skeleton from './skeleton.svg';
import styles from './styles.module.css';

type AvatarSize =
  | 'large'
  | 'big'
  | 'bigResize'
  | 'average'
  | 'averageResizeSmall'
  | 'averageResizeBig'
  | 'medium'
  | 'mediumResize'
  | 'small'
  | 'tiny';

type AvatarVariant = 'circle' | 'square';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  size: AvatarSize;
  variant: AvatarVariant;
  extSize?: number;
}

export const Avatar = ({
  extClassName,
  avatarLink,
  avatarName,
  size,
  variant = 'circle',
  extSize,
  ...props
}: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState<string>(skeleton);

  useEffect(() => {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 3000)
    );
    const fetchData = fetch(avatarLink, { method: 'GET', mode: 'no-cors' });
    Promise.race([fetchData, timeout])
      .then(() => setImgSrc(avatarLink))
      .catch(() => setImgSrc(defaultAvatar));
  }, []);

  const avatarStyles = classnames(
    styles.avatar,
    styles[size],
    styles[variant],
    extClassName
  );

  return (
    <img
      src={imgSrc}
      alt={avatarName}
      className={avatarStyles}
      {...props}
      style={{ width: extSize }}
    />
  );
};
