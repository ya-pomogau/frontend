import { userStatus } from 'shared/types/common.types';
import { RecipientInterface, VolunteerInterface } from 'shared/types/user.type';

export const mockVolunteer: VolunteerInterface = {
  _id: '0',
  name: 'string',
  phone: 'string',
  avatar: 'string',
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
  _id: '1',
  name: 'string',
  phone: 'string',
  avatar: 'string',
  address: 'string',
  vkId: 'string',
  role: 'string',
  status: userStatus.CONFIRMED,
  location: { type: 'Point', coordinates: [2, 2] },
  createdAt: new Date(2023, 7, 15, 0, 0, 0),
  updatedAt: new Date(2023, 7, 15, 0, 0, 0),
};
