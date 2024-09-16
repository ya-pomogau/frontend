import { userRole, UserRole } from 'shared/types/common.types';

export interface IDateUser {
  role: UserRole;
  avatarName: string;
  userName: string;
  userId: number;
  userNumber: string;
  avatarLink: string;
  volunteerInfo: {
    approved: boolean;
    checked: boolean;
    isHasKeys: boolean;
    scores: number;
  };
}

export const testUsers: IDateUser[] = [
  {
    role: userRole.VOLUNTEER,
    avatarName: 'Volunteer Avatar',
    userName: 'VИванов Иван Иванович',
    userId: 123,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: true,
      isHasKeys: true,
      scores: 60,
    },
  },
  {
    role: userRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'RСеменов Петр Игоревич',
    userId: 124,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      isHasKeys: true,
      scores: 60,
    },
  },

  {
    role: userRole.VOLUNTEER,
    avatarName: 'Volunteer Avatar',
    userName: 'VИванов Иван Иванович',
    userId: 125,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: userRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'RИванов Иван Иванович',
    userId: 126,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: userRole.ADMIN,
    avatarName: 'Volunteer Avatar',
    userName: 'AИванов Иван Иванович',
    userId: 127,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 40,
    },
  },
  {
    role: userRole.ADMIN,
    avatarName: 'Volunteer Avatar',
    userName: 'AИванов Иван Иванович',
    userId: 128,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      isHasKeys: false,
      scores: 40,
    },
  },
  {
    role: userRole.ADMIN,
    avatarName: 'Volunteer Avatar',
    userName: 'AИванов Иван Иванович',
    userId: 129,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      isHasKeys: false,
      scores: 40,
    },
  },
  {
    role: userRole.ADMIN,
    avatarName: 'Volunteer Avatar',
    userName: 'AИванов Иван Иванович',
    userId: 130,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      isHasKeys: false,
      scores: 40,
    },
  },
  {
    role: userRole.VOLUNTEER,
    avatarName: 'Volunteer Avatar',
    userName: 'VИванов Иван Иванович',
    userId: 131,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: userRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'RИванов Иван Иванович',
    userId: 132,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },

  {
    role: userRole.VOLUNTEER,
    avatarName: 'Volunteer Avatar',
    userName: 'VИванов Иван Иванович',
    userId: 133,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: userRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'RИванов Иван Иванович',
    userId: 134,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },

  {
    role: userRole.VOLUNTEER,
    avatarName: 'Volunteer Avatar',
    userName: 'VИванов Иван Иванович',
    userId: 135,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: userRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'RИванов Иван Иванович',
    userId: 136,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: userRole.ADMIN,
    avatarName: 'Volunteer Avatar',
    userName: 'AИванов Иван Иванович',
    userId: 137,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      isHasKeys: false,
      scores: 40,
    },
  },
  {
    role: userRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'VИванов Иван Иванович',
    userId: 138,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: userRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'RИванов Иван Иванович',
    userId: 139,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      isHasKeys: false,
      scores: 0,
    },
  },
  {
    role: userRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'AИванов Иван Иванович',
    userId: 140,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      isHasKeys: false,
      scores: 40,
    },
  },
];
