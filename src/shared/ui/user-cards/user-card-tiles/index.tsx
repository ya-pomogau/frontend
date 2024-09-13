import { useState } from 'react';
import classnames from 'classnames';

import VolunteerActions from 'shared/ui/user-cards/components/volonteer-actions';
import RecipientActions from 'shared/ui/user-cards/components/recipient-actions';
import AdminActions from 'shared/ui/user-cards/components/admin-actions';
import { RoundButton } from '../../round-button';
import UserInfo from 'shared/ui/user-cards/components/user-info';
import { Avatar } from '../../avatar';
import { User } from 'entities/user/types';
import { userRole, userStatus } from 'shared/types/common.types';

import styles from './styles.module.css';

export interface UserCardTilesProps {
  user: User;
  handleConfirmClick: () => void;
  isVolonteerAcceptButtonDisabled: boolean;
  isKeyButtonExclamationPointIcon: boolean;
  getButtonTypeFromScore: (
    score: number
  ) => 'primary' | 'partial' | 'secondary';
}

export const UserCardTiles = ({
  user,
  handleConfirmClick,
  isVolonteerAcceptButtonDisabled,
  isKeyButtonExclamationPointIcon,
  getButtonTypeFromScore,
}: UserCardTilesProps) => {
  const { name, role, avatar, phone, _id, score, keys, status, permissions } =
    user;
  const [isActon, setIsAction] = useState<boolean>(false);

  const handleClick = () => {
    setIsAction((state) => !state);
  };

  return (
    <div
      className={classnames(
        styles.content,
        role === userRole.ADMIN && isActon
          ? styles.admin_content_action
          : styles.admin_content
      )}
    >
      <Avatar
        extClassName={styles.avatar}
        avatarName={`аватар пользователя ${name}`}
        avatarLink={avatar}
      />
      {(role === userRole.VOLUNTEER || role === userRole.RECIPIENT) && (
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

      {role === userRole.VOLUNTEER && (
        <VolunteerActions
          extClassName={classnames(styles.buttons, styles.buttons_volunteers)}
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

      {role === userRole.RECIPIENT && (
        <RecipientActions
          extClassName={styles.buttons}
          approved={status !== userStatus.UNCONFIRMED}
          onConfirmClick={handleConfirmClick}
          onBlockClick={() => {
            console.log('Recipient block button pressed');
          }}
        />
      )}

      {role === userRole.ADMIN && (
        <AdminActions
          id={_id}
          permissions={permissions || []}
          onSwitchArrow={handleClick}
        />
      )}
    </div>
  );
};
