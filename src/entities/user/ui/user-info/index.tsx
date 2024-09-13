import { useAppDispatch } from 'app/hooks';
import { InfoContainer, InfoContainerContent, Loader } from 'shared/ui';
import { useControlModal, useRouteMatch, useUser } from 'shared/hooks';
import { userRole } from 'shared/types/common.types';
import { setTokenAccess } from 'shared/libs/utils';
import { Routes } from 'shared/config';
import { EditViewerInfo } from 'features/edit-viewer-info/ui';
import type { UpdateUserInfo } from 'entities/user/types';
import { useUpdateUserProfileMutation } from 'services/user-api';
import { setUser } from 'entities/user/model';
import { VolunteerInfo } from './volunteer-info';
import { UnauthorizedUser } from './unauthorized-user';

export const UserInfo = () => {
  const dispatch = useAppDispatch();
  const { isOpen, handleOpen, handleClose } = useControlModal();

  const user = useUser();
  const isInAuthUser = useRouteMatch([
    Routes.REGISTER,
    Routes.LOGIN,
    Routes.VK_AUTH,
  ]);

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
      <InfoContainerContent
        id={user.vkId}
        name={user.name}
        phone={user.phone}
        address={user.address}
      />
      {user.role === userRole.VOLUNTEER && (
        <VolunteerInfo score={user.score || 0} hasKey={user.keys || false} />
      )}
    </InfoContainer>
  ) : (
    <InfoContainer name="Незарегистрированный пользователь">
      {!isInAuthUser && <UnauthorizedUser />}
    </InfoContainer>
  );
};
