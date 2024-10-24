import { MessageInterface } from 'shared/types/chat.types';
import { mockRecipient, mockVolunteer } from './mock-users';

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
