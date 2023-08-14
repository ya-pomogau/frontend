import { IChatList, IMessage } from '../types';

export const getMockMessages = (): IMessage[] => [
  {
    messageId: 1,
    userId: 1,
    userAvatarLink: 'https://i.pravatar.cc/300',
    text: 'Здравствуйте, я буду сопровождать вас на мероприятии',
    date: new Date(2023, 4, 15, 0, 0, 0),
  },
  {
    messageId: 3,
    userId: 2,
    userAvatarLink: 'https://i.pravatar.cc/300',
    text: 'Отлично, спасибо, встретимся у 3-го подъезда',
    date: new Date(2023, 4, 15, 0, 5, 0),
  },
  {
    messageId: 2,
    userId: 1,
    userAvatarLink: 'https://i.pravatar.cc/300',
    text: 'Договорились так и сделаем',
    date: new Date(2023, 4, 15, 24, 0, 0),
  },
];

export const mockChatsList: Array<IChatList> = [
  {
    name: 'Иванов Иван Иванович',
    id: 112230,
    avatar: '1',
    message: 'Здравствуйте, не могу понять как отменить заявку',
    notifications: 5,
  },
  {
    name: 'Чебурашка Карина Игоревна',
    id: 112231,
    avatar: '1',
    message: 'Волонтер не пришел в назначенное время',
    notifications: 3,
  },
  {
    name: 'Игошина Яна Витальевна',
    id: 12232,
    avatar: '1',
    message: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    name: 'Курицин Ян Олегович',
    id: 112233,
    avatar: '1',
    message: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    name: 'Иванов Иван Иванович',
    id: 112234,
    avatar: '1',
    message: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    name: 'Иванов Иван Иванович',
    id: 112235,
    avatar: '1',
    message: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    name: 'Иванов Иван Иванович',
    id: 112236,
    avatar: '1',
    message: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    name: 'Иванов Иван Иванович',
    id: 112237,
    avatar: '1',
    message: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    name: 'Иванов Иван Иванович',
    id: 112238,
    avatar: '1',
    message: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    name: 'Иванов Иван Иванович',
    id: 112239,
    avatar: '1',
    message: 'Договорились, так и сделаем',
    notifications: 0,
  },
  {
    name: 'Иванов Иван Иванович',
    id: 112240,
    avatar: '1',
    message: 'Договорились, так и сделаем',
    notifications: 0,
  },
];

export const sortMessages = (messages: IMessage[]) =>
  messages.sort((a, b) => (a.date > b.date ? 1 : -1));
