import { GetUserChatsResponseInterface } from 'shared/types/chat.types';
import { mockTasks } from './mock-tasks';

export const mockChatResponse: GetUserChatsResponseInterface = {
  task: [mockTasks],
  system: [],
  conflict: [],
};
