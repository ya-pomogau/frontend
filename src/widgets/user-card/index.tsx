import { ReactNode, useState } from 'react';
import classnames from 'classnames';

import { Avatar } from '../../shared/ui/avatar';

import styles from './styles.module.css';
import { RoundButton } from '../../shared/ui/round-button';
import UserInfo from './components/user-info';
import VolunteerActions from './components/volonteer-actions';
import RecipientActions from './components/recipient-actions';
import AdminActions from './components/admin-actions';

interface UserCardProps {
  role?: 'volunteer' | 'recipient' | 'admin' | 'master';
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
  const { approved, checked, scores, keys } = volunteerInfo;

  const isVolonteerAcceptButtonDisabled =
    (scores === 0 && approved) ||
    (scores >= 30 && scores < 60 && checked) ||
    scores >= 60;

  const isAcceptButtonExclamationPointIcon =
    scores >= 30 && !checked && scores < 60;

  const isKeyButtonExclamationPointIcon = scores >= 60 && !checked && !keys;

  return (
    <div
      className={classnames(
        styles.content,
        extClassName,
        role === 'admin' && styles.admin_content
      )}
    >
      <Avatar
        extClassName={styles.avatar}
        avatarName={avatarName}
        avatarLink={avatarLink}
      />
      {(role === 'volunteer' || role === 'recipient') && (
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

      {role === 'volunteer' && (
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
          keys={keys}
        />
      )}

      {role === 'recipient' && (
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

      {role === 'admin' && (
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
