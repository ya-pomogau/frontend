import {
  chatTypes,
  ConflictChatInfo,
  ConflictChatsTupleMetaInterface,
  MessageInterface,
  RecipientConflictChatMetaInterface,
  TaskChatInfo,
  TaskChatMetaInterface,
  VolunteerConflictChatMetaInterface,
} from 'shared/types/chat.types';
import { mockChatMessages } from './mock-messages';
import { mockAdmin, mockRecipient, mockVolunteer } from './mock-users';

/* #####################
################### USER
##################### */

export const mockConflictTaskChatMeta: TaskChatMetaInterface = {
  type: chatTypes.TASK_CHAT,
  _id: '24',
  isActive: false,
  recipient: mockRecipient,
  volunteer: mockVolunteer,
  taskId: '222',
  createdAt: new Date(2024, 8, 15, 0, 0, 0),
  updatedAt: new Date(2024, 8, 16, 31, 0, 0),
  unreads: 0,
  watermark: '101',
};

export const mockConflictTasks: TaskChatInfo = {
  meta: mockConflictTaskChatMeta,
  chats: mockChatMessages,
};

/* #####################
############### MESSAGES
##################### */
export const mockConflictVolunteerMessages: MessageInterface[] = [
  {
    _id: '1',
    author: mockVolunteer,
    attaches: [],
    chatId: '112',
    body: 'Он не пришёл!',
    createdAt: new Date(2024, 10, 15, 0, 0, 0),
  },
  {
    _id: '1',
    author: mockVolunteer,
    attaches: [],
    chatId: '112',
    body: 'Я всё облазил!',
    createdAt: new Date(2024, 10, 16, 0, 0, 0),
  },
];

export const mockConflictRecipientMessages: MessageInterface[] = [
  {
    _id: '1',
    author: mockRecipient,
    attaches: [],
    chatId: '911',
    body: 'Волонтёр не пришёл!',
    createdAt: new Date(2024, 10, 15, 0, 0, 0),
  },
  {
    _id: '2',
    author: mockRecipient,
    attaches: [],
    chatId: '911',
    body: 'Я замерз.',
    createdAt: new Date(2024, 10, 16, 5, 0, 0),
  },
];

/* #####################
################## ADMIN
##################### */

export const volunteerMetaConflictChat: VolunteerConflictChatMetaInterface = {
  type: chatTypes.CONFLICT_CHAT_WITH_VOLUNTEER,
  _id: '33',
  isActive: true,
  volunteer: mockVolunteer,
  createdAt: new Date(2024, 7, 15, 0, 0, 0),
  updatedAt: new Date(2024, 7, 16, 31, 0, 0),
  unreads: 0,
  watermark: '2',
};

export const recipientMetaConflictChat: RecipientConflictChatMetaInterface = {
  type: chatTypes.CONFLICT_CHAT_WITH_RECIPIENT,
  _id: '44',
  isActive: true,
  recipient: mockRecipient,
  createdAt: new Date(2024, 7, 15, 0, 0, 0),
  updatedAt: new Date(2024, 7, 16, 31, 0, 0),
  unreads: 0,
  watermark: '2',
};

export const mockMetaConflictChatsMessage: ConflictChatsTupleMetaInterface = {
  moderator: mockAdmin,
  taskId: '222',
  adminVolunteerWatermark: 'string',
  adminVolunteerUnreads: 0,
  adminRecipientWatermark: 'string',
  adminRecipientUnreads: 0,
  meta: [volunteerMetaConflictChat, recipientMetaConflictChat],
};

export const mockConflict: ConflictChatInfo = {
  meta: mockMetaConflictChatsMessage,
  chats: [mockConflictVolunteerMessages, mockConflictRecipientMessages],
};
