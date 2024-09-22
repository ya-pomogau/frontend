import {
  GetAdminChatsResponseInterface,
  GetUserChatsResponseInterface,
} from 'shared/types/chat.types';
import { mockTasks } from './mock-tasks';
import { mockSystem } from './mock-system';
import { mockConflict } from './mock-conflict';

/* #####################
################### USER
##################### */

export const mockUserChatsResponse: GetUserChatsResponseInterface = {
  task: [mockTasks],
  system: [mockSystem],
  // conflict: [],
};

/* #####################
################## ADMIN
##################### */

export const mockAdminChatsResponse: GetAdminChatsResponseInterface = {
  my: [mockSystem],
  system: [mockSystem],
  conflict: [mockConflict],
  moderated: [mockConflict],
};
