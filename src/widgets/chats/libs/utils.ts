import { IChat, IConflict, IMessage } from './types';

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
    userId: 112229,
    userAvatarLink: 'https://i.pravatar.cc/300',
    text: 'Отлично, спасибо, встретимся у 3-го подъезда',
    date: new Date(2023, 4, 15, 0, 5, 0),
  },
];

export const mockChatsList: Array<IChat> = [
  {
    chatId: '0',
    name: 'Иванов Иван Иванович',
    userId: 112230,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Здравствуйте, не могу понять как отменить заявку',
    notifications: 5,
    phone: '+7(000) 000-00-00',
  },
  {
    chatId: '1',
    name: 'Чебурашка Карина Игоревна',
    userId: 112231,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Волонтер не пришел в назначенное время',
    notifications: 3,
    phone: '+7(000) 000-00-00',
  },
  {
    chatId: '2',
    name: 'Игошина Яна Витальевна',
    userId: 12232,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
    phone: '+7(000) 000-00-00',
  },
  {
    chatId: '3',
    name: 'Курицин Ян Олегович',
    userId: 112233,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
    phone: '+7(000) 000-00-00',
  },
  {
    chatId: '4',
    name: 'Иванов Иван Иванович',
    userId: 112234,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
    phone: '+7(000) 000-00-00',
  },
  {
    chatId: '5',
    name: 'Иванов Иван Иванович',
    userId: 112235,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
    phone: '+7(000) 000-00-00',
  },
  {
    chatId: '6',
    name: 'Иванов Иван Иванович',
    userId: 112236,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
    phone: '+7(000) 000-00-00',
  },
  {
    chatId: '7',
    name: 'Иванов Иван Иванович',
    userId: 112237,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
    phone: '+7(000) 000-00-00',
  },
  {
    chatId: '8',
    name: 'Иванов Иван Иванович',
    userId: 112238,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
    phone: '+7(000) 000-00-00',
  },
  {
    chatId: '9',
    name: 'Иванов Иван Иванович',
    userId: 112239,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
    phone: '+7(000) 000-00-00',
  },
  {
    chatId: '10',
    name: 'Иванов Иван Иванович',
    userId: 112240,
    userAvatarLink: 'https://i.pravatar.cc/300',
    incomingMessage: 'Договорились, так и сделаем',
    notifications: 0,
    phone: '+7(000) 000-00-00',
  },
];

export const mockConflictList: Array<IConflict> = [
  {
    conflictId: '0',
    volunteer: {
      role: 'Волонтер',
      userName: 'Петров Петр Петрович',
      userId: 112230,
      avatarLink: 'https://i.pravatar.cc',
      avatarName: 'avatar',
    },
    recipient: {
      role: 'Реципиент',
      userName: 'Петров Петр Петрович',
      userId: 112231,
      avatarLink: 'https://i.pravatar.cc',
      avatarName: 'avatar',
    },
    date: new Date(2023, 9, 24, 16, 0, 0),
    address: 'ул. Нахимова, д.9, у подъезда №3',
    theme: 'Сопровождение',
    description:
      'Заболел и совсем нет сил даже ходить по квартире. Почти неделю собаку выгуливали соседи, но в пятницу они не смогут. Помогите, пожалуйста!',
  },
  {
    conflictId: '1',
    volunteer: {
      role: 'Волонтер',
      userName: 'Петров Петр Петрович',
      userId: 112232,
      avatarLink: 'https://i.pravatar.cc',
      avatarName: 'avatar',
    },
    recipient: {
      role: 'Реципиент',
      userName: 'Петров Петр Петрович',
      userId: 112233,
      avatarLink: 'https://i.pravatar.cc',
      avatarName: 'avatar',
    },
    date: new Date(2023, 9, 24, 16, 0, 0),
    address: 'ул. Нахимова, д.9, у подъезда №3',
    theme: 'Сопровождение',
    description:
      'Заболел и совсем нет сил даже ходить по квартире. Почти неделю собаку выгуливали соседи, но в пятницу они не смогут. Помогите, пожалуйста!',
  },
];

export async function getChatList() {
  await delay(300);
  return mockChatsList;
}

export async function getConflictList() {
  await delay(300);
  return mockConflictList;
}

export const sortMessages = (messages: IMessage[]) =>
  messages.sort((a, b) => (a.date > b.date ? 1 : -1));

export const adminNotifications = [
  'Волонтер прошел проверку и ждет подтверждения',
  'Волонтер достиг 2-го уровня доверия.',
  'Волонтер достиг 3-го уровня доверия. Выдайте ему ключ',
];
export const volunteerNotifications = [
  'Вы достигли 2-го уровня . Теперь вам доступно больше заявок',
  'Вы достигли 3-го уровня . Теперь вам доступно больше заявок',
];
export const recipientNotifications = [
  'Администратор подтвердил Ваш аккаунт. Вы можете создать заявку',
];
