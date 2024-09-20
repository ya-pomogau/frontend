import { useCallback } from 'react';
import { userRole, userStatus } from '../../shared/types/common.types';
import { User } from 'entities/user/types';
import {
  useBlockUserMutation,
  useConfirmUserMutation,
  usePromoteUserMutation,
} from 'services/admin-api';
import { UserCardTiles } from 'shared/ui/user-cards/user-card-tiles';
import { UserCardList } from 'shared/ui/user-cards/user-card-list';
import { useMediaQuery } from 'shared/hooks';
import { Breakpoints } from 'shared/config';

interface UserCardProps {
  user: User;
  viewMode: 'tiles' | 'list';
}

const getButtonTypeFromScore = (
  score: number,
  status?: UserStatus
): 'primary' | 'partial' | 'secondary' => {
  if (!score && !status) {
    return 'primary';
  }  if (  score < 60 &&status&&status> UserStatus.UNCONFIRMED) {
    return 'partial';
  } else {
    return 'secondary';
  }
};

export const UserCard = ({ user, viewMode }: UserCardProps) => {
  const mediaQuery = useMediaQuery(Breakpoints.L);
  const { score, status, keys, role } = user;
 
  const AcceptButtonDisabled = (status?: UserStatus, score?: number, role?: UserRole)=>{
  if (score && status && role){
    if (score < 30 || score >= 60  && status === UserStatus.CONFIRMED && role === UserRole.VOLUNTEER)
     { return true}
    
  } else if (!status){
    return false
  } else return true
  return false
}
  const isVolonteerAcceptButtonDisabled = AcceptButtonDisabled (status, score, role)
  const [confirmUser] = useConfirmUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [promoteUser] = usePromoteUserMutation();

  const handleConfirmClick = useCallback(() => {
    confirmUser(user._id);
  }, [confirmUser, user._id]);

  const handleBlockClick = () => {
    if (status === userStatus.BLOCKED) {
      promoteUser(user._id);
    } else {
      blockUser(user._id);
    }
  };

   const isKeyButtonExclamationPointIcon = !!(score && score >= 60 && !keys);
  const isAcceptButtonExclamationPointIcon =!!(score && score >= 30 && score<60 && !keys);
  
  return viewMode === 'tiles' || mediaQuery ? (
    <UserCardTiles
      user={user}
      handleConfirmClick={handleConfirmClick}
      handleBlockClick={handleBlockClick}
      isVolonteerAcceptButtonDisabled={isVolonteerAcceptButtonDisabled}
      isKeyButtonExclamationPointIcon={isKeyButtonExclamationPointIcon}
      isAcceptButtonExclamationPointIcon={isAcceptButtonExclamationPointIcon}
      getButtonTypeFromScore={getButtonTypeFromScore}
    />
  ) : (
    <UserCardList
      user={user}
      handleConfirmClick={handleConfirmClick}
      handleBlockClick={handleBlockClick}
      isVolonteerAcceptButtonDisabled={isVolonteerAcceptButtonDisabled}
      isKeyButtonExclamationPointIcon={isKeyButtonExclamationPointIcon}
      getButtonTypeFromScore={getButtonTypeFromScore}
      isAcceptButtonExclamationPointIcon={isAcceptButtonExclamationPointIcon}
    />
  );
};
