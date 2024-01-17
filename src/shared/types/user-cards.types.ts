import { TVolunteerInfo, UserRole } from '../../entities/user/types';

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
