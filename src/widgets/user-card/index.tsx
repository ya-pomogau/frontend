import { useCallback, useEffect } from 'react';
import { UserRole, UserStatus } from '../../shared/types/common.types';
import { User } from 'entities/user/types';
import { useConfirmUserMutation } from 'services/admin-api';
import { UserCardTile } from 'shared/ui/user-cards/user-card-tile';
import { UserCardList } from 'shared/ui/user-cards/user-card-list';

interface UserCardProps {
  user: User;
  viewMode: 'tiles' | 'list';
}

const getButtonTypeFromScore = (
  score: number
): 'primary' | 'partial' | 'secondary' => {
  if (score < 30) {
    return 'primary';
  } else if (score < 60) {
    return 'partial';
  } else {
    return 'secondary';
  }
};

export const UserCard = ({ user, viewMode }: UserCardProps) => {
  const { name, score, status, keys, role, avatar, _id, phone } = user;
  const isVolonteerAcceptButtonDisabled = !!(
    status &&
    status > UserStatus.UNCONFIRMED &&
    role === UserRole.VOLUNTEER
  );

  const [confirmUser] = useConfirmUserMutation();

  const handleConfirmClick = useCallback(() => {
    confirmUser(user._id);
  }, [confirmUser, user._id]);

  const isKeyButtonExclamationPointIcon = !!(score && score >= 60 && !keys);

  return viewMode === 'tiles' ? (
    <UserCardTile
      user={user}
      handleConfirmClick={handleConfirmClick}
      isVolonteerAcceptButtonDisabled={isVolonteerAcceptButtonDisabled}
      isKeyButtonExclamationPointIcon={isKeyButtonExclamationPointIcon}
      getButtonTypeFromScore={getButtonTypeFromScore}
    />
  ) : (
    <UserCardList
      user={user}
      handleConfirmClick={handleConfirmClick}
      isVolonteerAcceptButtonDisabled={isVolonteerAcceptButtonDisabled}
      isKeyButtonExclamationPointIcon={isKeyButtonExclamationPointIcon}
      getButtonTypeFromScore={getButtonTypeFromScore}
    />
  );
};
