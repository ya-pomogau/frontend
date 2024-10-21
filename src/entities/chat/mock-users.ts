import { userRole, userStatus } from 'shared/types/common.types';
import {
  AdminInterface,
  RecipientInterface,
  VolunteerInterface,
} from 'shared/types/user.type';

export const mockAdmin: AdminInterface = {
  _id: '0',
  name: 'Admin',
  avatar: 'https://i.pravatar.cc/42',
  role: userRole.ADMIN,
  phone: 'phone',
  address: 'address',
  vkId: 'vkId',
  isActive: true,
  isRoot: true,
  permissions: ['CREATE_TASK', 'CONFIRM_USER'],
  login: 'login',
  password: 'password',
  createdAt: new Date(2022, 7, 15, 0, 0, 0),
  updatedAt: new Date(2022, 7, 15, 0, 0, 0),
};

export const mockVolunteer: VolunteerInterface = {
  _id: '1',
  role: userRole.VOLUNTEER,
  name: 'Volunteer',
  avatar: 'https://i.pravatar.cc/300',
  phone: 'phone',
  address: 'address',
  vkId: 'vkId',
  score: 1,
  status: userStatus.VERIFIED,
  location: { type: 'Point', coordinates: [0, 0] },
  keys: true,
  tasksCompleted: 0,
  createdAt: new Date(2022, 7, 15, 0, 0, 0),
  updatedAt: new Date(2022, 7, 15, 0, 0, 0),
};

export const mockRecipient: RecipientInterface = {
  _id: '2',
  name: 'Recipient',
  role: userRole.RECIPIENT,
  avatar: 'https://i.pravatar.cc/305',
  phone: 'phone',
  address: 'address',
  vkId: 'vkId',
  status: userStatus.CONFIRMED,
  location: { type: 'Point', coordinates: [2, 2] },
  createdAt: new Date(2023, 7, 15, 0, 0, 0),
  updatedAt: new Date(2023, 7, 15, 0, 0, 0),
};
