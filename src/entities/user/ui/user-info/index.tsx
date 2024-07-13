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
import { UserRole } from 'shared/types/common.types';
import { setUser } from 'entities/user/model';
import { setTokenAccess } from 'shared/libs/utils';
import { useControlModal, useRouteMatch } from 'shared/hooks';

export const UserInfo = () => {
  const dispatch = useAppDispatch();
  const { isOpen, handleOpen, handleClose } = useControlModal();

  const user = useAppSelector((state) => state.user.data);
  const isInAuthUser = useRouteMatch(['/register', '/login', '/vk-auth']);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  const handleSaveViewerSettings = async (
    userData: Omit<UpdateUserInfo, '_id'>
    // avatarFile: FormData
  ) => {
    try {
      const resultAction = await updateUserProfile(userData);
      if ('data' in resultAction) {
        dispatch(setUser(resultAction.data));
        setTokenAccess(resultAction.data?.token);
      } else {
        console.error('Ошибка при обновлении профиля:', resultAction.error);
      }
      handleClose();
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };

  return user ? (
    <InfoContainer
      name={user.name}
      avatar={user.avatar}
      onClickSettingsButton={handleOpen}
    >
      {isLoading && <Loader />}
      <EditViewerInfo
        userName={user.name}
        userPhone={user.phone}
        userAvatar={user.avatar}
        userAddress={user.address}
        onSave={handleSaveViewerSettings}
        isOpen={isOpen}
        onClose={handleClose}
      />
      <div className={styles.contentWrapper}>
        <InfoContainerContent
          id={user.vkId}
          name={user.name}
          phone={user.phone}
          address={user.address}
        />
        {user.role === UserRole.VOLUNTEER && (
          <VolunteerInfo score={user.score || 0} hasKey={user.keys || false} />
        )}
      </div>
    </InfoContainer>
  ) : (
    <InfoContainer name="Незарегистрированный пользователь">
      {!isInAuthUser && <UnauthorizedUser />}
    </InfoContainer>
  );
};
