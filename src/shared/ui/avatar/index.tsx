import { ImgHTMLAttributes } from 'react';
import classnames from 'classnames';

import defaultAvatar from './placeholder.svg';
import skeleton from './skeleton.svg';
import styles from './styles.module.css';
import { useLoaded } from 'shared/hooks';

type AvatarSize = 'large' | 'big' | 'average' | 'medium' | 'small' | 'tiny';

type AvatarVariant = 'circle' | 'square';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  size: AvatarSize;
  variant?: AvatarVariant;
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
  const loaded = useLoaded(avatarLink);
  const currentImage = !loaded
    ? skeleton
    : loaded === 'loaded'
    ? avatarLink
    : defaultAvatar;

  const avatarStyles = classnames(
    styles.avatar,
    styles[size],
    styles[variant],
    extClassName
  );

  return (
    <img
      src={currentImage}
      alt={avatarName}
      className={avatarStyles}
      {...props}
      style={{ width: extSize }}
    />
  );
};
