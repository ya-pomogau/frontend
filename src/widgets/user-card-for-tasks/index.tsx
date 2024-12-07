import { Avatar, RoundButton } from 'shared/ui';
import cn from 'classnames';

import { UserInfo } from '../user-card/components/index';
import { userRole } from '../../shared/types/common.types';
import { User } from 'entities/user/types';

import styles from './styles.module.css';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export const UserCardForTasks = ({ user, onClick }: UserCardProps) => {
  const { name, role, avatar, _id, phone } = user;

  return (
    <li
      className={cn(styles.content, styles.contentCardsList)}
      onClick={onClick}
    >
      <Avatar
        extClassName={styles.avatar}
        avatarName={`аватар пользователя ${name}`}
        avatarLink={avatar}
      />
      {(role === userRole.VOLUNTEER || role === userRole.RECIPIENT) && (
        <div className={cn(styles.icons_div, styles.icons_divCardsList)}>
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

      <UserInfo userName={name} userId={_id} userNumber={phone} />
    </li>
  );
};
