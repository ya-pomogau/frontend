import { DatabaseIdAndTimestampsInterface, ValueOf } from './common.types';
import {
  AdminInterface,
  AnyUserInterface,
  RecipientInterface,
  VolunteerInterface,
} from './user.type';

/* #####################
################# COMMON
##################### */

export const chatTypes = {
  TASK_CHAT: 'TaskChat',
  SYSTEM_CHAT: 'SystemChat',
  CONFLICT_CHAT_WITH_VOLUNTEER: 'ConflictChatWithVolunteer',
  CONFLICT_CHAT_WITH_RECIPIENT: 'ConflictChatWithRecipient',
} as const;

export type ChatType = ValueOf<typeof chatTypes>;

export interface ChatInterface extends DatabaseIdAndTimestampsInterface {
  type: ChatType;
  isActive: boolean;
}

export interface WatermarkInterface {
  watermark: string;
  unreads: number;
}

/* #####################
########### CHAT CONTENT
##################### */

export interface MessageInterface {
  _id: string;
  body: string;
  attaches: string[];
  createdAt: Date;
  author: AnyUserInterface;
  chatId: string;
}

export type VolunteerChatContent = Array<MessageInterface>;
export type RecipientChatContent = Array<MessageInterface>;
export type SystemChatContent = Array<MessageInterface>;
export type TaskChatContent = Array<MessageInterface>;

/* #####################
################# SYSTEM
##################### */

export interface SystemChatInterface extends ChatInterface {
  user: VolunteerInterface | RecipientInterface;
  admin: AdminInterface;
  userLastReadAt: Date | null;
  adminLastReadAt: Date | null;
}

export interface SystemChatMetaInterface
  extends Omit<SystemChatInterface, 'userLastReadAt' | 'adminLastReadAt'>,
    WatermarkInterface {}

export interface SystemChatInfo {
  meta: SystemChatMetaInterface;
  chats: SystemChatContent;
}

/* #####################
################### TASK
##################### */

export interface TaskChatInterface extends ChatInterface {
  taskId: string;
  volunteer: VolunteerInterface;
  recipient: RecipientInterface;
  volunteerLastReadAt: Date | null;
  recipientLastReadAt: Date | null;
}

export type CreateTaskChatInterface = Pick<
  TaskChatInterface,
  'taskId' | 'type' | 'volunteer' | 'recipient'
>;

export interface TaskChatMetaInterface
  extends ChatInterface,
    Omit<TaskChatInterface, 'volunteerLastReadAt' | 'recipientLastReadAt'>,
    WatermarkInterface {}

export interface TaskChatInfo {
  meta: TaskChatMetaInterface;
  chats: TaskChatContent;
}

/* #####################
############### CONFLICT
##################### */

export interface ConflictChatInterface extends ChatInterface {
  taskId: string;
  opponentChat: string;
  admin: AdminInterface;
  adminLastReadAt: Date | null;
}

export interface ConflictChatWithVolunteerInterface
  extends ConflictChatInterface {
  volunteer: VolunteerInterface;
  volunteerLastReadAt: Date | null;
}

export interface ConflictChatWithRecipientInterface
  extends ConflictChatInterface {
  recipient: RecipientInterface;
  recipientLastReadAt: Date | null;
}

export interface VolunteerConflictChatMetaInterface
  extends ChatInterface,
    Pick<ConflictChatWithVolunteerInterface, 'volunteer'>,
    WatermarkInterface {}

export interface RecipientConflictChatMetaInterface
  extends ChatInterface,
    Pick<ConflictChatWithRecipientInterface, 'recipient'>,
    WatermarkInterface {}

export interface ConflictChatsTupleMetaInterface {
  moderator: AdminInterface | null;
  taskId: string;
  adminVolunteerWatermark: string;
  adminVolunteerUnreads: number;
  adminRecipientWatermark: string;
  adminRecipientUnreads: number;
  meta: [
    VolunteerConflictChatMetaInterface,
    RecipientConflictChatMetaInterface
  ];
}

export interface ConflictChatInfo {
  meta: ConflictChatsTupleMetaInterface;
  chats: [VolunteerChatContent, RecipientChatContent];
}

/* #####################
############### RESPONSE
##################### */

export interface GetUserChatsResponseInterface {
  task: Array<TaskChatInfo>;
  system: Array<SystemChatInfo>;
  // conflict: Array<ConflictChatInfo>;
}

export interface GetAdminChatsResponseInterface {
  my: Array<SystemChatInfo>;
  system: Array<SystemChatInfo>;
  moderated: Array<ConflictChatInfo>;
  conflict: Array<ConflictChatInfo>;
}
