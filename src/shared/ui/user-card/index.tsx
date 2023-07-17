import { ReactNode } from 'react';
import classnames from 'classnames';

import { Avatar } from '../avatar';

import styles from './styles.module.css';

interface UserCardProps {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId: number;
  userNumber: string;
  children?: ReactNode;
}

export const UserCard = ({
  extClassName,
  avatarLink = 'https://i.pravatar.cc/300',
  avatarName,
  userName,
  userId,
  userNumber,
  children,
}: UserCardProps) => (
  <div className={classnames(styles.content, extClassName)}>
    <Avatar
      extClassName={styles.avatar}
      avatarName={avatarName}
      avatarLink={avatarLink}
    />
    <div className={styles.user_info}>
      <h2 className="m-0 text text_size_medium text_type_regular">
        {' '}
        {userName}
      </h2>
      <div className={classnames(styles.grid_two, styles.id_color)}>
        <p className="m-0 text text_size_small text_type_regular"> ID </p>{' '}
        <p className="m-0 text text_size_small text_type_regular"> {userId}</p>
      </div>
      <div className={styles.grid_two}>
        <p className="m-0 text text_size_small text_type_bold "> тел: </p>{' '}
        <p className="m-0 text text_size_small text_type_regular">
          {' '}
          {userNumber}
        </p>
      </div>
    </div>
    {children}
  </div>
);
