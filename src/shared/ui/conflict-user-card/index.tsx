import { ReactNode } from 'react';
import classnames from 'classnames';

import { Avatar } from '../avatar';

import styles from './styles.module.css';
import { PhoneIcon } from '../icons/phone-icon';
import { EmptyMessageIcon } from '../icons/empty-message-icon';

interface IConflictUserCardProps {
  role: string;
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId: number;
  icon: ReactNode;
}

export const ConflictUserCard = ({
  role,
  extClassName,
  avatarLink,
  avatarName,
  userName,
  userId,
  icon,
}: IConflictUserCardProps) => (
  <div className={classnames(styles.content, extClassName)}>
    <p
      className={classnames(
        'text',
        'text_size_small',
        'text_type_bold',
        styles.role
      )}
    >
      {role}
    </p>
    <div className={styles.user}>
      <Avatar
        avatarLink={avatarLink}
        avatarName={avatarName}
        extClassName={classnames(styles.avatar)}
      />
      <div className={classnames(styles.icons)}>
        <div className={classnames(styles.icon)}>
          <PhoneIcon color={'white'} />
        </div>
        <div className={classnames(styles.icon)}>
          <EmptyMessageIcon color={'white'} />
        </div>
      </div>
      <p className={classnames('text', 'text_size_medium', styles.id)}>
        {userName}
      </p>
      <p
        className={classnames('text', 'text_size_small', styles.id)}
      >{`ID ${userId}`}</p>
    </div>
    <div className={classnames(styles.colorIcons)}>{icon}</div>
  </div>
);
