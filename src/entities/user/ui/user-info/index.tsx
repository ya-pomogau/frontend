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
import { useUpdateUserProfileMutation } from 'services/user-api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import styles from './styles.module.css';
import { UserRole, UserStatus } from 'shared/types/common.types';
import { isRootSelector, setUser } from 'entities/user/model';
import { setTokenAccess } from 'shared/libs/utils';

export const UserInfo = () => {
  const role = useAppSelector((state) => state.user.role);
  // берем данные пользователя из стора (следующую строчку надо закоментить, чтобы тестировать фронт без бэка)
  const user = useAppSelector((state) => state.user.data);
  const location = useLocation();
  const isRegisterPath = location.pathname.includes('/register');
  const isLoginPath = location.pathname.includes('/login');
  const isVKAuthPath = location.pathname.includes('/vk-auth');
  // Этот код нужно раскоментить, если нужно тестить фронт без бэка
  // const userStatus = useAppSelector((state) => state.user.data?.status);
  // const isRoot = useAppSelector(isRootSelector);
  // const userId = () => {
  //   if (role === UserRole.VOLUNTEER) return '7';
  //   if (role === UserRole.ADMIN && isRoot) return '1';
  //   if (role === UserRole.RECIPIENT && userStatus === UserStatus.CONFIRMED)
  //     return '4';
  //   if (role === UserRole.RECIPIENT && userStatus === UserStatus.UNCONFIRMED)
  //     return '9';
  //   if (role === UserRole.ADMIN && !isRoot) return '2';
  //   if (!role) return null;
  // };
  // const { data: user } = useGetUserByIdQuery(userId() ?? skipToken);
  const dispatch = useAppDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const [image, setImage] = useState<string>('');
  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenSettingClick = () => {
    setIsPopupOpen(true);
  };

  const handleSaveViewerSettings = async (
    userData: Omit<UpdateUserInfo, '_id'>
    // avatarFile: FormData
  ) => {
    try {
      if (isFormEdited) {
        // if (image) {
        //   //   await updateUserProfile({ _id: userData?._id, file: avatarFile }).unwrap();
        //   // }
        const resultAction = await updateUserProfile(userData);
        if ('data' in resultAction) {
          dispatch(setUser(resultAction.data));
          setTokenAccess(resultAction.data?.token);
        } else {
          console.error('Ошибка при обновлении профиля:', resultAction.error);
        }
      }
      setIsFormSaved(true);
      setIsFormEdited(false);
      setImage('');
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
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
          id={user.vkId}
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
