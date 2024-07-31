import type { ImgHTMLAttributes } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  extClassName?: string;
  avatarLink: string | undefined;
  avatarName: string;
}

export const Avatar = ({
  extClassName,
  avatarLink,
  avatarName,
  ...props
}: AvatarProps) => (
  <img
    src={avatarLink || 'https://i.pravatar.cc/100'}
    alt={avatarName}
    className={classnames(styles.avatar, extClassName)}
    {...props}
  />
);
