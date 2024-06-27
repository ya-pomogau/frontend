import classnames from 'classnames';
import VolunteerActions from 'shared/ui/user-cards/components/volonteer-actions';
import RecipientActions from 'shared/ui/user-cards/components/recipient-actions';
import AdminActions from 'shared/ui/user-cards/components/admin-actions';
import styles from './styles.module.css';
import { RoundButton } from '../../round-button';
import UserInfo from 'shared/ui/user-cards/components/user-info';
import { Avatar } from '../../avatar';
import { User } from 'entities/user/types';
import { UserRole, UserStatus } from 'shared/types/common.types';

interface UserCardListProps {
  user: User;
  handleConfirmClick: () => void;
  isVolonteerAcceptButtonDisabled: boolean;
  isKeyButtonExclamationPointIcon: boolean;
  getButtonTypeFromScore: (
    score: number
  ) => 'primary' | 'partial' | 'secondary';
}

export const UserCardList = ({
  user,
  handleConfirmClick,
  isVolonteerAcceptButtonDisabled,
  isKeyButtonExclamationPointIcon,
  getButtonTypeFromScore,
}: UserCardListProps) => {
  const { name, role, avatar, phone, _id, score, keys, status } = user;

  return (
    <div
      className={classnames(
        styles.content,
        role === UserRole.ADMIN && styles.admin_content
      )}
    >
      <Avatar
        extClassName={styles.avatar}
        avatarName={`аватар пользователя ${name}`}
        avatarLink={avatar}
      />

      <UserInfo
        userName={name}
        viewMode="list"
        userId={_id}
        userNumber={phone}
        role={role}
        extraClasses={styles.user_info_space}
      >
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
      </UserInfo>

      {role === UserRole.VOLUNTEER && (
        <VolunteerActions
          extClassName={styles.buttons_div_list_volunteers}
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
          viewMode="list"
          extClassName={styles.buttons_div_list_recipients}
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
