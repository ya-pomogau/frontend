import { useAppDispatch, useAppSelector } from 'app/hooks';

import { InfoContainer } from 'shared/ui/info-container';
import { InfoContainerContent } from 'shared/ui/info-container-content';
import { VolunteerInfo } from './volunteer-info';
import { UnauthorizedUser } from './unauthorized-user';

import styles from './styles.module.css';
import { useRef, useState } from 'react';
import { updateUserInfo, uploadUserAvatar } from 'entities/user/model';
import type { UpdateUserInfo } from 'entities/user/types';
import { EditViewerInfo } from 'features/edit-viewer-info/ui';

export const UserInfo = () => {
  const user = useAppSelector((state) => state.user.data);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormEdited, setIsFormSaved] = useState(false);
  const dispatch = useAppDispatch();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenSettingClick = () => {
    setIsPopupOpen(true);
  };

  const handleSaveViewerSettings = async (
    userData: UpdateUserInfo,
    avatarFile: FormData
  ) => {
    dispatch(uploadUserAvatar(avatarFile));
    dispatch(updateUserInfo(userData));
    setIsFormSaved(true);
    setIsPopupOpen(false);
  };

  return user ? (
    <InfoContainer
      name={user.fullname}
      avatar={user.avatar}
      onClickSettingsButton={handleOpenSettingClick}
      buttonRef={buttonRef}
    >
      <EditViewerInfo
        avatarLink={user.avatar}
        avatarName={user.avatar}
        onClickSave={handleSaveViewerSettings}
        valueName={user.fullname}
        valuePhone={user.phone}
        valueAddress={user.address}
        isPopupOpen={isPopupOpen}
        valueId={user.id}
        buttonRef={buttonRef}
        isFormEdited={isFormEdited}
        setIsFormSaved={setIsFormSaved}
        setIsPopupOpen={setIsPopupOpen}
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
