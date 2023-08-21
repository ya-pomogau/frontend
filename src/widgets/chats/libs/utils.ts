import { IChatList, IMessage } from './types';

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getMockMessages = (): IMessage[] => [
  {
    messageId: 1,
    userId: 112230,
    userAvatarLink: 'https://i.pravatar.cc/300',
    text: 'Здравствуйте, я буду сопровождать вас на мероприятии',
    date: new Date(2023, 4, 15, 0, 0, 0),
  },
  {
    messageId: 2,
    userId: 112230,
    userAvatarLink: 'https://i.pravatar.cc/300',
    text: 'Договорились так и сделаем',
    date: new Date(2023, 4, 15, 24, 0, 0),
  },
  {
    messageId: 3,
    userId: 11229,
    userAvatarLink: 'https://i.pravatar.cc/300',
    text: 'Отлично, спасибо, встретимся у 3-го подъезда',
    date: new Date(2023, 4, 15, 0, 5, 0),
  },
];

export const mockChatsList: Array<IChatList> = [
  {
    chatId: 0,
    name: 'Иванов Иван Иванович',
    userId: 112230,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Здравствуйте, не могу понять как отменить заявку',
    notifications: 5,
  },
  {
    chatId: 1,
    name: 'Чебурашка Карина Игоревна',
    userId: 112231,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Волонтер не пришел в назначенное время',
    notifications: 3,
  },
  {
    chatId: 2,
    name: 'Игошина Яна Витальевна',
    userId: 12232,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    chatId: 3,
    name: 'Курицин Ян Олегович',
    userId: 112233,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    chatId: 4,
    name: 'Иванов Иван Иванович',
    userId: 112234,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    chatId: 5,
    name: 'Иванов Иван Иванович',
    userId: 112235,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    chatId: 6,
    name: 'Иванов Иван Иванович',
    userId: 112236,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    chatId: 7,
    name: 'Иванов Иван Иванович',
    userId: 112237,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    chatId: 8,
    name: 'Иванов Иван Иванович',
    userId: 112238,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    chatId: 9,
    name: 'Иванов Иван Иванович',
    userId: 112239,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    chatId: 10,
    name: 'Иванов Иван Иванович',
    userId: 112240,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
  },
];

export async function getChatList() {
  await delay(300);
  return mockChatsList;
}

export const sortMessages = (messages: IMessage[]) =>
  messages.sort((a, b) => (a.date > b.date ? 1 : -1));
