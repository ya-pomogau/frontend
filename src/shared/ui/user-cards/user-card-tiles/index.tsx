import { useState } from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';
import VolunteerActions from 'shared/ui/user-cards/components/volonteer-actions';
import RecipientActions from 'shared/ui/user-cards/components/recipient-actions';
import AdminActions from 'shared/ui/user-cards/components/admin-actions';
import { RoundButton } from '../../round-button';
import UserInfo from 'shared/ui/user-cards/components/user-info';
import { Avatar } from '../../avatar';
import { User } from 'entities/user/types';
import {
  AdminPermission,
  UserRole,
  UserStatus,
} from 'shared/types/common.types';
import {
  useAddAdminPrivilegiesMutation,
  useBlockAdminMutation,
} from 'services/admin-api';
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
  const [addAdminPrivilegies] = useAddAdminPrivilegiesMutation();
  const [blockAdmin] = useBlockAdminMutation();

  const handleClick = () => {
    setIsAction((state) => !state);
  };

  const handleAddPrivileges = async (body: AdminPermission[] | undefined) => {
    try {
      const result = await addAdminPrivilegies({ _id, body });
      console.log('Privileges added:', result);
    } catch (err) {
      console.error('Error adding privileges:', err);
    }
  };

  return (
    <div
      className={classnames(
        styles.content,
        role === UserRole.ADMIN && isActon
          ? styles.admin_content_action
          : styles.admin_content
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
          permissions={permissions}
          onSwitchArrow={handleClick}
          onAdminSaveClick={handleAddPrivileges}
          onAdminBlockClick={() => {
            blockAdmin(_id);
            console.log('Admin block button pressed');
          }}
        />
      )}

      {/* {children} */}
    </div>
  );
};
