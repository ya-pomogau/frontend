import {
  SystemChatInfo,
  SystemChatMetaInterface,
} from 'shared/types/chat.types';
import { mockChatMessages } from './mock-messages';
import { mockAdmin, mockVolunteer } from './mock-users';

export const mockMetaSystemChatMessage: SystemChatMetaInterface = {
  user: mockVolunteer,
  admin: mockAdmin,
  type: 'SystemChat',
  _id: '42',
  isActive: true,
  createdAt: new Date(2024, 7, 15, 0, 0, 0),
  updatedAt: new Date(2024, 7, 16, 31, 0, 0),
  unreads: 1,
  watermark: '',
};

export const mockSystem: SystemChatInfo = {
  meta: mockMetaSystemChatMessage,
  chats: mockChatMessages,
};
