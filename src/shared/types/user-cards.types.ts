import { TVolunteerInfo } from '../../entities/user/types';
import { UserRole } from './common.types';

export type UserCardType = {
  role: UserRole;
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId: number;
  userNumber: string;
  volunteerInfo: TVolunteerInfo;
};
