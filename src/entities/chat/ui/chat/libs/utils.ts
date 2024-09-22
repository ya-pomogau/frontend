import { MessageInterface } from 'shared/types/chat.types';

export const sortMessages = (messages: MessageInterface[]) =>
  messages.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
