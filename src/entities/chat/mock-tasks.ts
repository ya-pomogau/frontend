import {
  chatTypes,
  TaskChatInfo,
  TaskChatMetaInterface,
} from 'shared/types/chat.types';
import { mockChatMessages } from './mock-messages';
import { mockRecipient, mockVolunteer } from './mock-users';

export const mockTaskChatMeta: TaskChatMetaInterface = {
  type: chatTypes.TASK_CHAT,
  _id: '42',
  isActive: true,
  recipient: mockRecipient,
  volunteer: mockVolunteer,
  taskId: '1',
  createdAt: new Date(2024, 7, 15, 0, 0, 0),
  updatedAt: new Date(2024, 7, 16, 31, 0, 0),
  unreads: 3,
  watermark: '98',
};

export const mockTasks: TaskChatInfo = {
  meta: mockTaskChatMeta,
  chats: mockChatMessages,
};
