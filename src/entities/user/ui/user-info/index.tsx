import { useAppDispatch, useAppSelector } from 'app/hooks';

import { InfoContainer } from 'shared/ui/info-container';
import { InfoContainerContent } from 'shared/ui/info-container-content';
import { VolunteerInfo } from './volunteer-info';
import { UnauthorizedUser } from './unauthorized-user';

import { EditViewerInfo } from 'features/edit-viewer-info/ui';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { updateUserInfo } from 'entities/user/model';
import { UpdateUserInfo } from 'entities/user/types';

export const UserInfo = () => {
  const user = useAppSelector((state) => state.user.data);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenSettingClick = () => {
    setIsPopupOpen(true);
  };

  const handleCloseViewerSettings = () => {
    setIsPopupOpen(false);
  };

  const handleSaveViewerSettings = async (viewerData: UpdateUserInfo) => {
    dispatch(updateUserInfo(viewerData));
    setIsPopupOpen(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown);
    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, []);

  const handleEscKeydown = (e: { key: string }) => {
    e.key === 'Escape' && handleCloseViewerSettings();
  };

  return user ? (
    <InfoContainer
      name={user.fullname}
      avatar={user.avatar}
      onClickSettingsButton={handleOpenSettingClick}
    >
      <EditViewerInfo
        avatarLink={user.avatar}
        avatarName={user.avatar}
        handlerAvatar={() => 1}
        onClickSave={handleSaveViewerSettings}
        onClickExit={handleCloseViewerSettings}
        valueName={user.fullname}
        valuePhone={user.phone}
        valueAddress={user.address}
        isPopupOpen={isPopupOpen}
        valueId={user.id}
      />

      <div className={styles.contentWrapper}>
        <InfoContainerContent
          id={user.id}
          name={user.fullname}
          phone={user.phone}
          address={user.address}
        />

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
