import { GetUserChatsResponseInterface } from 'shared/types/chat.types';
import { mockTasks } from './mock-tasks';
import { mockSystem } from './mock-system';

export const mockChatResponse: GetUserChatsResponseInterface = {
  task: [mockTasks],
  system: [mockSystem],
  // conflict: [],
};
