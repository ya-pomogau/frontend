import classnames from 'classnames';

import { Avatar } from '../../shared/ui/avatar';

import styles from './styles.module.css';
import { RoundButton } from '../../shared/ui/round-button';
import UserInfo from '../user-card/components/user-info';
import { UserRole } from '../../shared/types/common.types';
import { User } from 'entities/user/types';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export const UserCardForTasks = ({ user, onClick }: UserCardProps) => {
  const { name, role, avatar, _id, phone } = user;

  return (
    <div
      className={classnames(
        styles.content,
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
            disabled
          />
          <RoundButton
            buttonType="message"
            onClick={() => console.log('message button pressed')}
            disabled
          />
        </div>
      )}

      <UserInfo userName={name} userId={_id} userNumber={phone} role={role} />
    </div>
  );
};
