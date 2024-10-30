import { ImgHTMLAttributes, useState } from 'react';
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
}: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState(
    avatarLink || 'https://i.pravatar.cc/100'
  );

  const handleError = () => {
    setImgSrc('https://i.pravatar.cc/100'); // Дефолтный аватар
  };

  return (
    <img
      src={imgSrc}
      alt={avatarName}
      className={classnames(styles.avatar, extClassName)}
      onError={handleError} // Обрабатываем ошибку
      {...props}
    />
  );
};
