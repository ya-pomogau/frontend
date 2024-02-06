import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { InfoContainer } from 'shared/ui/info-container';
import { InfoContainerContent } from 'shared/ui/info-container-content';
import { Loader } from 'shared/ui/loader';
import { VolunteerInfo } from './volunteer-info';
import { UnauthorizedUser } from './unauthorized-user';
import { EditViewerInfo } from 'features/edit-viewer-info/ui';
import type { UpdateUserInfo } from 'entities/user/types';
import { useGetUserByIdQuery, useUpdateUsersMutation } from 'services/user-api';
import { useAppSelector } from 'app/hooks';
import styles from './styles.module.css';
import { UserRole, UserStatus } from 'shared/types/common.types';

export const UserInfo = () => {
  const role = useAppSelector((state) => state.user.role);
  const userStatus = useAppSelector((state) => state.user.data?.status);

  const location = useLocation();
  const isRegisterPath = location.pathname.includes('/register');
  const isLoginPath = location.pathname.includes('/login');
  const isVKAuthPath = location.pathname.includes('/vk-auth');
  const userId = () => {
    if (role === UserRole.VOLUNTEER) return '7';
    if (role === UserRole.USER) return '1';
    if (role === UserRole.RECIPIENT && userStatus === UserStatus.CONFIRMED) return '4';
    if (role === UserRole.RECIPIENT && userStatus === UserStatus.UNCONFIRMED)
      return '9';
    if (role === UserRole.ADMIN) return '2';
    if (!role) return null;
  };
  const { data: user } = useGetUserByIdQuery(userId() ?? skipToken);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const [image, setImage] = useState<string>('');
  const [updateUserData, { isLoading, error }] = useUpdateUsersMutation();
  // const isAuth = useUser();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenSettingClick = () => {
    setIsPopupOpen(true);
    alert(
      'При изменении формы сбрасывается аватар. Поправить потом можно в файле db.json'
    );
  };

  const handleSaveViewerSettings = async (
    userData: UpdateUserInfo,
    avatarFile: FormData
  ) => {
    if (isFormEdited) {
      if (image) {
        await updateUserData({ _id: userData?._id, file: avatarFile }).unwrap();
      }
      if (
        user?.name !== userData.name ||
        user?.phone !== userData.phone ||
        user?.address !== userData.address
      )
        await updateUserData(userData).unwrap();
    }
    setIsFormSaved(true);
    setIsFormEdited(false);
    setImage('');
    setIsPopupOpen(false);
  };

  return user ? (
    <InfoContainer
      name={user.name}
      avatar={user.avatar}
      onClickSettingsButton={handleOpenSettingClick}
      buttonRef={buttonRef}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <EditViewerInfo
          avatarLink={user.avatar}
          avatarName={user.avatar}
          onClickSave={handleSaveViewerSettings}
          valueName={user.name}
          valuePhone={user.phone}
          valueAddress={user.address}
          isPopupOpen={isPopupOpen}
          valueId={user._id}
          buttonRef={buttonRef}
          isFormSaved={isFormSaved}
          setIsFormSaved={setIsFormSaved}
          setIsPopupOpen={setIsPopupOpen}
          isFormEdited={isFormEdited}
          setIsFormEdited={setIsFormEdited}
          image={image}
          setImage={setImage}
        />
      )}

      <div className={styles.contentWrapper}>
        <InfoContainerContent
          id={user._id}
          name={user.name}
          phone={user.phone}
          address={user.address}
        />

        {role === UserRole.VOLUNTEER && (
          <VolunteerInfo score={user.score || 0} hasKey={user.keys || false} />
        )}
      </div>
    </InfoContainer>
  ) : (
    <InfoContainer name="Незарегистрированный пользователь">
      {!isRegisterPath && !isVKAuthPath && !isLoginPath && <UnauthorizedUser />}
    </InfoContainer>
  );
};
