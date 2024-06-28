import { useCallback } from 'react';
import classnames from 'classnames';

import { Avatar } from '../../shared/ui/avatar';

import styles from './styles.module.css';
import { RoundButton } from '../../shared/ui/round-button';
import UserInfo from './components/user-info';
import { UserRole, UserStatus } from '../../shared/types/common.types';
import VolunteerActions from './components/volonteer-actions';
import RecipientActions from './components/recipient-actions';
import AdminActions from './components/admin-actions';
import { User } from 'entities/user/types';
import { useConfirmUserMutation } from 'services/admin-api';

interface UserCardProps {
  user: User;
}

const getButtonTypeFromScore = (
  score: number
): 'primary' | 'partial' | 'secondary' => {
  if (score < 30) {
    return 'primary';
  } else if (score < 60) {
    return 'partial';
  } else {
    return 'secondary';
  }
};
export const UserCard = ({ user }: UserCardProps) => {
  const { name, score, status, keys, role, avatar, _id, phone } = user;
  const isVolonteerAcceptButtonDisabled = !!(
    status &&
    status > UserStatus.UNCONFIRMED &&
    role === UserRole.VOLUNTEER
  );

  const [confirmUser] = useConfirmUserMutation();

  const handleConfirmClick = useCallback(() => {
    confirmUser(user._id);
  }, []);

  const isKeyButtonExclamationPointIcon = !!(score && score >= 60 && !keys);

  return (
    <div
      className={classnames(
        styles.content,
        // extClassName,
        role === UserRole.ADMIN && styles.admin_content
      )}
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

      {role === UserRole.VOLUNTEER && (
        <VolunteerActions
          isVolonteerAcceptButtonDisabled={isVolonteerAcceptButtonDisabled}
          getButtonTypeFromScore={getButtonTypeFromScore}
          score={score || 0}
          isAcceptButtonExclamationPointIcon={true}
          isKeyButtonExclamationPointIcon={isKeyButtonExclamationPointIcon}
          onAcceptButtonClick={handleConfirmClick}
          onBlockButtonClick={() =>
            console.log('"Заблокировать" button pressed')
          }
          onGiveKeysButtonClick={() =>
            console.log('"Дать ключи" button pressed')
          }
          keys={keys || false}
        />
      )}

      {role === UserRole.RECIPIENT && (
        <RecipientActions
          approved={status !== UserStatus.UNCONFIRMED}
          onConfirmClick={handleConfirmClick}
          onBlockClick={() => {
            console.log('Recipient block button pressed');
          }}
        />
      )}

      {role === UserRole.ADMIN && (
        <AdminActions
          onAdminSaveClick={() => {
            console.log('Admin save button pressed');
          }}
          onAdminBlockClick={() => {
            console.log('Admin block button pressed');
          }}
        />
      )}

      {/* {children} */}
    </div>
  );
};
