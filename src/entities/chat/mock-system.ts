import {
  chatTypes,
  MessageInterface,
  SystemChatInfo,
  SystemChatMetaInterface,
} from 'shared/types/chat.types';

import { mockAdmin, mockRecipient, mockVolunteer } from './mock-users';

/* #####################
############### Volunteer
##################### */

export const mockMetaSystemVolunteerChatMessage: SystemChatMetaInterface = {
  user: mockVolunteer,
  admin: mockAdmin,
  type: chatTypes.SYSTEM_CHAT,
  _id: '42',
  isActive: true,
  createdAt: new Date(2024, 10, 13, 0, 0, 0),
  updatedAt: new Date(2024, 10, 14, 0, 0, 0),
  unreads: 0,
  watermark: '101',
};

export const mockVolunteerToAdminMessages: MessageInterface[] = [
  {
    _id: '1',
    author: mockVolunteer,
    attaches: [],
    chatId: '35',
    body: 'Я готов помогать, но не могу!',
    createdAt: new Date(2024, 10, 13, 0, 0, 0),
  },
  {
    _id: '2',
    author: mockVolunteer,
    attaches: [],
    chatId: '35',
    body: 'Куда тут жать, чтобы помогать?',
    createdAt: new Date(2024, 10, 14, 0, 0, 0),
  },
];

/* #####################
############### Recipient
##################### */

export const mockMetaSystemRecipientChatMessage: SystemChatMetaInterface = {
  user: mockRecipient,
  admin: mockAdmin,
  type: chatTypes.SYSTEM_CHAT,
  _id: '78',
  isActive: true,
  createdAt: new Date(2024, 10, 12, 0, 0, 0),
  updatedAt: new Date(2024, 10, 13, 5, 0, 0),
  unreads: 0,
  watermark: '808',
};

export const mockRecipientToAdminMessages: MessageInterface[] = [
  {
    _id: '1',
    author: mockRecipient,
    attaches: [],
    chatId: '53',
    body: 'Мне нужна помощь!',
    createdAt: new Date(2024, 10, 12, 0, 0, 0),
  },
  {
    _id: '2',
    author: mockRecipient,
    attaches: [],
    chatId: '53',
    body: 'Как мне создать заявку?',
    createdAt: new Date(2024, 10, 13, 5, 0, 0),
  },
];

/* #####################
############### System
##################### */

export const mockSystem: SystemChatInfo[] = [
  {
    meta: mockMetaSystemVolunteerChatMessage,
    chats: mockVolunteerToAdminMessages,
  },
  {
    meta: mockMetaSystemRecipientChatMessage,
    chats: mockRecipientToAdminMessages,
  },
];
