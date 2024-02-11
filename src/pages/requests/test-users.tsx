import { UserRole } from 'shared/types/common.types';

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
    keys: boolean;
    adminStatus: null;
    scores: number;
  };
}

export const testUsers: IDateUser[] = [
  {
    role: UserRole.VOLUNTEER,
    avatarName: 'Volunteer Avatar',
    userName: 'Антон Иван Иванович',
    userId: 10,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: true,
      keys: true,
      adminStatus: null,
      scores: 60,
    },
  },
  {
    role: UserRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'Женя Петр Игоревич',
    userId: 11,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      keys: true,
      adminStatus: null,
      scores: 60,
    },
  },

  {
    role: UserRole.VOLUNTEER,
    avatarName: 'Volunteer Avatar',
    userName: 'Саша Иван Иванович',
    userId: 12,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },
  {
    role: UserRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'Костя Иван Иванович',
    userId: 13,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },
  {
    role: UserRole.ADMIN,
    avatarName: 'Volunteer Avatar',
    userName: 'Мария Иван Иванович',
    userId: 14,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 40,
    },
  },
  {
    role: UserRole.ADMIN,
    avatarName: 'Volunteer Avatar',
    userName: 'Юля Иван Иванович',
    userId: 15,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 40,
    },
  },
  {
    role: UserRole.ADMIN,
    avatarName: 'Volunteer Avatar',
    userName: 'Леша Иван Иванович',
    userId: 16,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 40,
    },
  },
  {
    role: UserRole.ADMIN,
    avatarName: 'Volunteer Avatar',
    userName: 'Артур Иван Иванович',
    userId: 17,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 40,
    },
  },
  {
    role: UserRole.VOLUNTEER,
    avatarName: 'Volunteer Avatar',
    userName: 'Влад Иван Иванович',
    userId: 18,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },
  {
    role: UserRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'Марго Иван Иванович',
    userId: 19,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },

  {
    role: UserRole.VOLUNTEER,
    avatarName: 'Volunteer Avatar',
    userName: 'Анна Иван Иванович',
    userId: 20,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },
  {
    role: UserRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'Екатерина Иван Иванович',
    userId: 21,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },

  {
    role: UserRole.VOLUNTEER,
    avatarName: 'Volunteer Avatar',
    userName: 'Ольга Иван Иванович',
    userId: 22,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },
  {
    role: UserRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'Марк Иван Иванович',
    userId: 23,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },
  {
    role: UserRole.ADMIN,
    avatarName: 'Volunteer Avatar',
    userName: 'Эльдар Иван Иванович',
    userId: 24,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 40,
    },
  },
  {
    role: UserRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'Паша Иван Иванович',
    userId: 25,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },
  {
    role: UserRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'Ксения Иван Иванович',
    userId: 26,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: false,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 0,
    },
  },
  {
    role: UserRole.RECIPIENT,
    avatarName: 'Volunteer Avatar',
    userName: 'Арсений Иван Иванович',
    userId: 27,
    userNumber: '+1 (123) 456-7890',
    avatarLink: 'https://i.pravatar.cc/300',
    volunteerInfo: {
      approved: true,
      checked: false,
      keys: false,
      adminStatus: null,
      scores: 40,
    },
  },
];
