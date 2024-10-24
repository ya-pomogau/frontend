import { User } from 'entities/user/types';
import { userRole, UserStatus, userStatus } from 'shared/types/common.types';
import VolunteerActions from '../components/volonteer-actions';
import RecipientActions from '../components/recipient-actions';
import UserInfo from '../components/user-info';
import { RoundButton } from '../../round-button';
import { Avatar } from '../../avatar';

import styles from './styles.module.css';

interface UserCardListProps {
  user: User;
  handleConfirmClick: () => void;
  handleBlockClick: () => void;
  isVolonteerAcceptButtonDisabled: boolean;
  isKeyButtonExclamationPointIcon: boolean;
  isAcceptButtonExclamationPointIcon: boolean;
  getButtonTypeFromScore: (
    score: number,
    status?: UserStatus
  ) => 'primary' | 'partial' | 'secondary';
}

export const UserCardList = ({
  user,
  handleConfirmClick,
  handleBlockClick,
  isVolonteerAcceptButtonDisabled,
  isKeyButtonExclamationPointIcon,
  isAcceptButtonExclamationPointIcon,
  getButtonTypeFromScore,
}: UserCardListProps) => {
  const { name, role, avatar, phone, _id, score, keys, status } = user;

  return (
    <div className={styles.content}>
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
        {(role === userRole.VOLUNTEER || role === userRole.RECIPIENT) && (
          <div className={styles.icons_div}>
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

      {role === userRole.VOLUNTEER && (
        <VolunteerActions
          extClassName={styles.buttons_div_list_volunteers}
          isVolonteerAcceptButtonDisabled={isVolonteerAcceptButtonDisabled}
          isUserBlocked={status === userStatus.BLOCKED}
          getButtonTypeFromScore={getButtonTypeFromScore}
          score={score || 0}
          status={status || 0}
          isAcceptButtonExclamationPointIcon={
            isAcceptButtonExclamationPointIcon
          }
          isKeyButtonExclamationPointIcon={isKeyButtonExclamationPointIcon}
          onAcceptButtonClick={handleConfirmClick}
          onBlockButtonClick={handleBlockClick}
          onGiveKeysButtonClick={() =>
            console.log('"Дать ключи" button pressed')
          }
          keys={keys || false}
        />
      )}

      {role === userRole.RECIPIENT && (
        <RecipientActions
          viewMode="list"
          extClassName={styles.buttons_div_list_recipients}
          approved={status !== userStatus.UNCONFIRMED}
          isUserBlocked={status === userStatus.BLOCKED}
          onConfirmClick={handleConfirmClick}
          onBlockClick={handleBlockClick}
        />
      )}
    </div>
  );
};
