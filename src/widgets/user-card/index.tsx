import { ReactNode } from 'react';
import classnames from 'classnames';

import { Avatar } from '../../shared/ui/avatar';

import styles from './styles.module.css';
import { RoundButton } from '../../shared/ui/round-button';
import UserInfo from './components/user-info';
import VolunteerActions from './components/volonteer-actions';
import RecipientActions from './components/recipient-actions';
import AdminActions from './components/admin-actions';
import { UserRole } from 'shared/types/common.types';

interface UserCardProps {
  role?: UserRole;
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId: number;
  userNumber: string;
  children?: ReactNode;
  volunteerInfo?: any;
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
export const UserCard = ({
  role,
  extClassName,
  avatarLink,
  avatarName,
  userName,
  userId,
  userNumber,
  children,
  volunteerInfo,
}: UserCardProps) => {
  const { approved, checked, scores, isHasKeys } = volunteerInfo;
  const isVolonteerAcceptButtonDisabled =
    (scores === 0 && approved) ||
    (scores >= 30 && scores < 60 && checked) ||
    scores >= 60;

  const isAcceptButtonExclamationPointIcon =
    scores >= 30 && !checked && scores < 60;

  const isKeyButtonExclamationPointIcon =
    scores >= 60 && !checked && !isHasKeys;

  return (
    <div
      className={classnames(
        styles.content,
        extClassName,
        role === UserRole.ADMIN && styles.admin_content
      )}
    >
      <Avatar
        extClassName={styles.avatar}
        avatarName={avatarName}
        avatarLink={avatarLink}
      />
      {(role === UserRole.VOLUNTEER || role === UserRole.RECIPIENT) && (
        <div className={classnames(styles.icons_div)}>
          <RoundButton
            buttonType="phone"
            onClick={() => console.log('call button pressed')}
          />
          <RoundButton
            buttonType="message"
            onClick={() => console.log('message button pressed')}
          />
        </div>
      )}

      <UserInfo
        userName={userName}
        userId={userId}
        userNumber={userNumber}
        role={role}
      />

      {role === UserRole.VOLUNTEER && (
        <VolunteerActions
          isVolonteerAcceptButtonDisabled={isVolonteerAcceptButtonDisabled}
          getButtonTypeFromScore={getButtonTypeFromScore}
          scores={scores}
          isAcceptButtonExclamationPointIcon={
            isAcceptButtonExclamationPointIcon
          }
          isKeyButtonExclamationPointIcon={isKeyButtonExclamationPointIcon}
          onAcceptButtonClick={() =>
            console.log('"подтвердить" button pressed')
          }
          onBlockButtonClick={() =>
            console.log('"Заблокировать" button pressed')
          }
          onGiveKeysButtonClick={() =>
            console.log('"Дать ключи" button pressed')
          }
          keys={isHasKeys}
        />
      )}

      {role === UserRole.RECIPIENT && (
        <RecipientActions
          approved={approved}
          onConfirmClick={() => {
            console.log('Recipient confirm button pressed');
          }}
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

      {children}
    </div>
  );
};
