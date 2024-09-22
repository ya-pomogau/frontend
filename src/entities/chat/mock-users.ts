import { userStatus } from 'shared/types/common.types';
import {
  AdminInterface,
  RecipientInterface,
  VolunteerInterface,
} from 'shared/types/user.type';

export const mockAdmin: AdminInterface = {
  _id: '0',
  name: 'Admin',
  phone: '+1',
  avatar: 'https://i.pravatar.cc/42',
  address: 'string',
  vkId: 'string',
  role: 'string',
  isActive: true,
  isRoot: true,
  permissions: ['CREATE_TASK', 'CONFIRM_USER'],
  login: 'string',
  password: 'string',
  createdAt: new Date(2022, 7, 15, 0, 0, 0),
  updatedAt: new Date(2022, 7, 15, 0, 0, 0),
};

export const mockVolunteer: VolunteerInterface = {
  _id: '1',
  name: 'Volunteer',
  phone: '+6',
  avatar: 'https://i.pravatar.cc/300',
  address: 'string',
  vkId: 'string',
  role: 'string',
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
  phone: '+7',
  avatar: 'https://i.pravatar.cc/305',
  address: 'string',
  vkId: 'string',
  role: 'string',
  status: userStatus.CONFIRMED,
  location: { type: 'Point', coordinates: [2, 2] },
  createdAt: new Date(2023, 7, 15, 0, 0, 0),
  updatedAt: new Date(2023, 7, 15, 0, 0, 0),
};
