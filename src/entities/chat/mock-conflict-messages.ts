import { MessageInterface } from 'shared/types/chat.types';
import { mockRecipient, mockVolunteer } from './mock-users';

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
    body: 'Он не пришёл!',
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
