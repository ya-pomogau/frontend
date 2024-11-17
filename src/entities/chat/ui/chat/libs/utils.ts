import { mockChatMessages } from 'entities/chat/mock-messages';
import { mockAdmin } from 'entities/chat/mock-users';
import { MessageInterface } from 'shared/types/chat.types';
import { AdminInterface } from 'shared/types/user.type';

export const getMockMessages = (): MessageInterface[] => mockChatMessages;

export const infoAdmin: AdminInterface = mockAdmin;

export const sortMessages = (messages: MessageInterface[]) =>
  messages.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
