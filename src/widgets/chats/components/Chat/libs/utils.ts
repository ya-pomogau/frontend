import { IMessage } from '../types';

export const getMockMessages = (): IMessage[] => [
  {
    id: 1,
    userId: '1',
    userAvatarLink: 'https://i.pravatar.cc/300',
    message: 'Здравствуйте, я буду сопровождать вас на мероприятии',
    date: new Date(2023, 4, 15, 0, 0, 0),
  },
  {
    id: 2,
    userId: '1',
    userAvatarLink: 'https://i.pravatar.cc/300',
    message: 'Договорились так и сделаем',
    date: new Date(2023, 4, 15, 24, 0, 0),
  },
  {
    id: 3,
    userId: '2',
    userAvatarLink: 'https://i.pravatar.cc/300',
    message: 'Отлично, спасибо, встретимся у 3-го подъезда',
    date: new Date(2023, 4, 15, 0, 5, 0),
  },
];

export const sortMessages = (messages: IMessage[]) =>
  messages.sort((a, b) => (a.date > b.date ? 1 : -1));
