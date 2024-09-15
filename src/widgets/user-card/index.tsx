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
  if (!score ) {
    return 'primary';
  } else if (  score < 60) {
    return 'partial';
  } else {
    return 'secondary';
  }
};

export const UserCard = ({ user, viewMode }: UserCardProps) => {
  const mediaQuery = useMediaQuery(Breakpoints.L);
  const { score, status, keys, role } = user;
  // const isVolonteerAcceptButtonDisabled = !!( 
  //   status && status === UserStatus.CONFIRMED &&
  //   // status > UserStatus.UNCONFIRMED  && status < UserStatus.VERIFIED && status > UserStatus.VERIFIED &&
  //   role === UserRole.VOLUNTEER
  //   && score && score < 30
  // );
const is = (status?: UserStatus, score?: number, role?: UserRole)=>{
  if (score && status && role){
    if (score < 30 || score >= 60  && status === UserStatus.CONFIRMED && role === UserRole.VOLUNTEER)
     { return true}
    
  } else if (!status){
    return false
  } else return true
  return false
}
const isVolonteerAcceptButtonDisabled = is (status, score, role)
  const [confirmUser] = useConfirmUserMutation();

  const handleConfirmClick = useCallback(() => {
    confirmUser(user._id);
  }, [confirmUser, user._id]);
 console.log("status:",  user.name, score, status)
// if (status&&score) getButtonStyle(status,score);
 const isKeyButtonExclamationPointIcon = !!(score && score >= 60 && !keys);
  const isAcceptButtonExclamationPointIcon =!!(score && score >= 30 && score<60 && !keys);
  
  return viewMode === 'tiles' || mediaQuery ? (
    <UserCardTiles
      user={user}
      handleConfirmClick={handleConfirmClick}
      isVolonteerAcceptButtonDisabled={isVolonteerAcceptButtonDisabled}
      isKeyButtonExclamationPointIcon={isKeyButtonExclamationPointIcon}
      isAcceptButtonExclamationPointIcon={isAcceptButtonExclamationPointIcon}
      getButtonTypeFromScore={getButtonTypeFromScore}
    />
  ) : (
    <UserCardList
      user={user}
      handleConfirmClick={handleConfirmClick}
      isVolonteerAcceptButtonDisabled={isVolonteerAcceptButtonDisabled}
      isKeyButtonExclamationPointIcon={isKeyButtonExclamationPointIcon}
      getButtonTypeFromScore={getButtonTypeFromScore}
      isAcceptButtonExclamationPointIcon={isAcceptButtonExclamationPointIcon}
    />
  );
};


// const isButtonActiveFirst = !!( status && status === UserStatus.UNCONFIRMED);
// const isbuttonPartial = !!(status && status > UserStatus.UNCONFIRMED);
// const isbuttonPartialActive = !!(status && status > UserStatus.UNCONFIRMED && score&& score>=30);
// const isButtonDisabled =!!( status && status > UserStatus.UNCONFIRMED && score&& score>=60);

const getButtonStyle = (status: UserStatus, score: number)=>{
  if (status) {
    if (status > UserStatus.UNCONFIRMED){
      if (score<30){
        console.log('partialDisabled')
        return 'partial'
      } else if (score >=30 && score <60){
        console.log('partialActive')
      } else console.log ('disabledGrey')
    } else console.log('blueButton')
  }
}