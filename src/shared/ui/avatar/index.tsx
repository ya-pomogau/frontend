import type { ImgHTMLAttributes } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
}

export const Avatar = ({
  extClassName,
  avatarLink = 'https://i.pravatar.cc/300',
  avatarName,
  ...props
}: AvatarProps) => (
  <img
    src={avatarLink}
    alt={avatarName}
    className={classnames(styles.avatar, extClassName)}
    {...props}
  />
);
