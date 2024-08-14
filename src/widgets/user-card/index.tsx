import { useCallback } from 'react';
import { UserRole, UserStatus } from '../../shared/types/common.types';
import { User } from 'entities/user/types';
import { useConfirmUserMutation } from 'services/admin-api';
import { UserCardTiles } from 'shared/ui/user-cards/user-card-tiles';
import { UserCardList } from 'shared/ui/user-cards/user-card-list';
import { useMediaQuery } from 'shared/hooks';
import { Breakpoints } from 'shared/config';

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
  const mediaQuery = useMediaQuery(Breakpoints.L);
  const { score, status, keys, role } = user;
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

  return viewMode === 'tiles' || mediaQuery ? (
    <UserCardTiles
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
