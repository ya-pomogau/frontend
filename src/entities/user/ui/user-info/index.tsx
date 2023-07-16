import { useAppSelector } from 'app/hooks';

import { InfoContainer } from 'shared/ui/info-container';
import { InfoContainerContent } from 'shared/ui/info-container-content';
import { VolunteerInfo } from './volunteer-info';
import { RecipientInfo } from './recipient-info';
import { UnauthorizedUser } from './unauthorized-user';

import styles from './styles.module.css';

export const UserInfo = () => {
  const user = useAppSelector((state) => state.user.data);

  const handleOpenSettingClick = () => {
    console.log('Open settings modal');
  };

  return user ? (
    <InfoContainer
      name={user.fullname}
      avatar={user.avatar}
      onClickSettingsButton={handleOpenSettingClick}
    >
      <div className={styles.contentWrapper}>
        <InfoContainerContent
          id={user.id}
          name={user.fullname}
          phone={user.phone}
          address={user.address}
        />

        {user.role === 'recipient' && (
          <RecipientInfo tasksCount={0} completedTasksCount={0} />
        )}

        {user.role === 'volunteer' && (
          <VolunteerInfo score={user.scores || 0} hasKey={user.keys} />
        )}
      </div>
    </InfoContainer>
  ) : (
    <InfoContainer name="Незарегистрированный пользователь">
      <UnauthorizedUser />
    </InfoContainer>
  );
};
