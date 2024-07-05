import { useCallback } from 'react';
import classnames from 'classnames';

import { Avatar } from '../../shared/ui/avatar';

import styles from './styles.module.css';
import { RoundButton } from '../../shared/ui/round-button';
import UserInfo from '../user-card/components/user-info';
import { UserRole, UserStatus } from '../../shared/types/common.types';
import { User } from 'entities/user/types';
import { useConfirmUserMutation } from 'services/admin-api';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export const UserCardForTasks = ({ user, onClick }: UserCardProps) => {
  const { name, score, status, keys, role, avatar, _id, phone } = user;

  return (
    <div
      className={classnames(
        styles.content,
        // extClassName,
        role === UserRole.ADMIN && styles.admin_content
      )}
      onClick={onClick}
    >
      <Avatar
        extClassName={styles.avatar}
        avatarName={`аватар пользователя ${name}`}
        avatarLink={avatar}
      />
      {(role === UserRole.VOLUNTEER || role === UserRole.RECIPIENT) && (
        <div className={classnames(styles.icons_div)}>
          <RoundButton
            buttonType="phone"
            onClick={() => {
              window.location.href = 'tel:' + phone;
            }}
          />
          <RoundButton
            buttonType="message"
            onClick={() => console.log('message button pressed')}
          />
        </div>
      )}

      <UserInfo userName={name} userId={_id} userNumber={phone} role={role} />
    </div>
  );
};
