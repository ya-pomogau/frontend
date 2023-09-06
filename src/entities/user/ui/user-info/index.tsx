import { useRef, useState } from 'react';

import { useAppSelector } from 'app/hooks';

import { InfoContainer } from 'shared/ui/info-container';
import { InfoContainerContent } from 'shared/ui/info-container-content';
import { VolunteerInfo } from './volunteer-info';
import { UnauthorizedUser } from './unauthorized-user';
import { EditViewerInfo } from 'features/edit-viewer-info/ui';

import type { UpdateUserInfo } from 'entities/user/types';

import styles from './styles.module.css';
import { useGetUserByIdQuery, useUpdateUsersMutation } from 'services/user-api';
import { Loader } from 'shared/ui/loader';
import { skipToken } from '@reduxjs/toolkit/query/react';
import useUser from 'shared/hooks/use-user';

export const UserInfo = () => {
  // const user = useAppSelector((state) => state.user.data);
  const role = useAppSelector((state) => state.user.role);
  const userId = () => {
    if (role === 'volunteer') return 7;
    if (role === 'master') return 1;
    if (role === 'recipient') return 4;
    if (role === 'admin') return 2;
    if (!role) return null;
  };
  const { data: user } = useGetUserByIdQuery(userId() ?? skipToken);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormSaved, setIsFormSaved] = useState(false);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const [image, setImage] = useState<string>('');
  const [updateUserData, { isLoading, error }] = useUpdateUsersMutation();
  const isAuth = useUser();

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
        await updateUserData({ id: userData?.id, file: avatarFile }).unwrap();
      }
      if (
        user?.fullname !== userData.fullname ||
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

  return isAuth ? (
    <InfoContainer
      name={user.fullname}
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
          valueName={user.fullname}
          valuePhone={user.phone}
          valueAddress={user.address}
          isPopupOpen={isPopupOpen}
          valueId={user.id}
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
