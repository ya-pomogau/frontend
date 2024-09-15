import { MessageInterface } from 'shared/types/chat.types';
import { mockRecipient, mockVolunteer } from './mock-users';

export const mockChatMessages: MessageInterface[] = [
  {
    _id: '1',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Добрый день!',
    createdAt: new Date(2024, 7, 15, 0, 0, 0),
  },
  {
    _id: '2',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Здравствуйте.',
    createdAt: new Date(2024, 7, 15, 5, 0, 0),
  },
  {
    _id: '3',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Я буду сопровождать Вас. Уточните, пожалуйста, точное место встречи.',
    createdAt: new Date(2024, 7, 15, 6, 0, 0),
  },
  {
    _id: '4',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Встречаемся у автобусной остановки напротив пенсионного фонда. ',
    createdAt: new Date(2024, 7, 15, 6, 30, 0),
  },
  {
    _id: '5',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Отлично, спасибо.',
    createdAt: new Date(2024, 7, 15, 7, 30, 0),
  },
  {
    _id: '6',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Куда Вас надо будет сопровождать?',
    createdAt: new Date(2024, 7, 15, 8, 0, 0),
  },
  {
    _id: '7',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'В библиотеку, хочу отнести туда старые книги.',
    createdAt: new Date(2024, 7, 15, 8, 30, 0),
  },
  {
    _id: '8',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Понятно, Вы знаете знаете поэму А.С. Пушкина "Руслан и Людмила?"',
    createdAt: new Date(2024, 7, 15, 9, 0, 0),
  },
  {
    _id: '9',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Конечно - У лукоморья дуб зелёный;',
    createdAt: new Date(2024, 7, 15, 10, 30, 0),
  },
  {
    _id: '10',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Златая цепь на дубе том:',
    createdAt: new Date(2024, 7, 15, 11, 30, 0),
  },
  {
    _id: '11',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И днём и ночью кот учёный',
    createdAt: new Date(2024, 7, 15, 12, 0, 0),
  },
  {
    _id: '12',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Всё ходит по цепи кругом;',
    createdAt: new Date(2024, 7, 15, 13, 0, 0),
  },
  {
    _id: '13',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Идёт направо — песнь заводит,',
    createdAt: new Date(2024, 7, 15, 13, 30, 0),
  },
  {
    _id: '14',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Налево — сказку говорит.',
    createdAt: new Date(2024, 7, 15, 14, 30, 0),
  },
  {
    _id: '15',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Там чудеса: там леший бродит,',
    createdAt: new Date(2024, 7, 15, 15, 0, 0),
  },
  {
    _id: '16',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Русалка на ветвях сидит;',
    createdAt: new Date(2024, 7, 15, 16, 0, 0),
  },
  {
    _id: '17',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Там на неведомых дорожках',
    createdAt: new Date(2024, 7, 15, 17, 30, 0),
  },
  {
    _id: '18',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Следы невиданных зверей;',
    createdAt: new Date(2024, 7, 15, 18, 30, 0),
  },
  {
    _id: '19',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Избушка там на курьих ножках',
    createdAt: new Date(2024, 7, 15, 19, 0, 0),
  },
  {
    _id: '20',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Стоит без окон, без дверей;',
    createdAt: new Date(2024, 7, 15, 20, 0, 0),
  },
  {
    _id: '21',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Там лес и дол видений полны;',
    createdAt: new Date(2024, 7, 15, 21, 0, 0),
  },
  {
    _id: '22',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Там о заре прихлынут волны',
    createdAt: new Date(2024, 7, 15, 22, 0, 0),
  },
  {
    _id: '23',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'На брег песчаный и пустой,',
    createdAt: new Date(2024, 7, 15, 22, 30, 0),
  },
  {
    _id: '24',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И тридцать витязей прекрасных',
    createdAt: new Date(2024, 7, 15, 23, 30, 0),
  },
  {
    _id: '25',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Чредой из вод выходят ясных,',
    createdAt: new Date(2024, 7, 15, 24, 30, 0),
  },
  {
    _id: '26',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И с ними дядька их морской',
    createdAt: new Date(2024, 7, 15, 25, 30, 0),
  },
  {
    _id: '27',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Там королевич мимоходом',
    createdAt: new Date(2024, 7, 15, 26, 0, 0),
  },
  {
    _id: '28',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Пленяет грозного царя;',
    createdAt: new Date(2024, 7, 15, 27, 0, 0),
  },
  {
    _id: '29',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Там в облаках перед народом',
    createdAt: new Date(2024, 7, 15, 28, 0, 0),
  },
  {
    _id: '30',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Через леса, через моря',
    createdAt: new Date(2024, 7, 15, 29, 0, 0),
  },
  {
    _id: '31',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Колдун несёт богатыря;',
    createdAt: new Date(2024, 7, 15, 29, 30, 0),
  },
  {
    _id: '32',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'В темнице там царевна тужит,',
    createdAt: new Date(2024, 7, 15, 30, 30, 0),
  },
  {
    _id: '33',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'А бурый волк ей верно служит;',
    createdAt: new Date(2024, 7, 15, 31, 30, 0),
  },
  {
    _id: '34',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Там ступа с Бабою Ягой',
    createdAt: new Date(2024, 7, 15, 32, 30, 0),
  },
  {
    _id: '35',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Идёт, бредёт сама собой,',
    createdAt: new Date(2024, 7, 15, 33, 0, 0),
  },
  {
    _id: '36',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Там царь Кащей над златом чахнет;',
    createdAt: new Date(2024, 7, 15, 34, 0, 0),
  },
  {
    _id: '37',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Там русский дух… там Русью пахнет!',
    createdAt: new Date(2024, 7, 15, 35, 0, 0),
  },
  {
    _id: '38',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И там я был, и мёд я пил;',
    createdAt: new Date(2024, 7, 15, 36, 0, 0),
  },
  {
    _id: '39',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'У моря видел дуб зелёный;',
    createdAt: new Date(2024, 7, 15, 36, 30, 0),
  },
  {
    _id: '40',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Под ним сидел, и кот учёный',
    createdAt: new Date(2024, 7, 15, 37, 30, 0),
  },
  {
    _id: '41',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Свои мне сказки говорил.',
    createdAt: new Date(2024, 7, 15, 38, 30, 0),
  },
  {
    _id: '42',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Одну я помню: сказку эту',
    createdAt: new Date(2024, 7, 15, 39, 30, 0),
  },
  {
    _id: '43',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Поведаю теперь я свету…',
    createdAt: new Date(2024, 7, 15, 40, 0, 0),
  },
  {
    _id: '44',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Дела давно минувших дней,',
    createdAt: new Date(2024, 7, 15, 41, 0, 0),
  },
  {
    _id: '45',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Преданья старины глубокой.',
    createdAt: new Date(2024, 7, 15, 42, 0, 0),
  },
  {
    _id: '46',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'В толпе могучих сыновей,',
    createdAt: new Date(2024, 7, 15, 43, 0, 0),
  },
  {
    _id: '47',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'С друзьями, в гриднице высокой',
    createdAt: new Date(2024, 7, 15, 43, 30, 0),
  },
  {
    _id: '48',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Владимир-солнце пировал;',
    createdAt: new Date(2024, 7, 15, 44, 30, 0),
  },
  {
    _id: '49',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Меньшую дочь он выдавал',
    createdAt: new Date(2024, 7, 15, 45, 30, 0),
  },
  {
    _id: '50',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'За князя храброго Руслана',
    createdAt: new Date(2024, 7, 15, 46, 30, 0),
  },
  {
    _id: '51',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И мед из тяжкого стакана',
    createdAt: new Date(2024, 7, 15, 47, 0, 0),
  },
  {
    _id: '52',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'За их здоровье выпивал.',
    createdAt: new Date(2024, 7, 15, 48, 0, 0),
  },
  {
    _id: '53',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Не скоро ели предки наши,',
    createdAt: new Date(2024, 7, 15, 49, 0, 0),
  },
  {
    _id: '54',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Не скоро двигались кругом',
    createdAt: new Date(2024, 7, 15, 50, 0, 0),
  },
  {
    _id: '55',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Ковши, серебряные чаши',
    createdAt: new Date(2024, 7, 15, 50, 30, 0),
  },
  {
    _id: '56',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'С кипящим пивом и вином.',
    createdAt: new Date(2024, 7, 15, 52, 30, 0),
  },
  {
    _id: '57',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Они веселье в сердце лили,',
    createdAt: new Date(2024, 7, 15, 52, 30, 0),
  },
  {
    _id: '58',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Шипела пена по краям,',
    createdAt: new Date(2024, 7, 15, 53, 30, 0),
  },
  {
    _id: '59',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Их важно чашники носили',
    createdAt: new Date(2024, 7, 15, 54, 0, 0),
  },
  {
    _id: '60',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И низко кланялись гостям.',
    createdAt: new Date(2024, 7, 15, 55, 0, 0),
  },
  {
    _id: '61',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Слилися речи в шум невнятный;',
    createdAt: new Date(2024, 7, 15, 56, 0, 0),
  },
  {
    _id: '62',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Жужжит гостей веселый круг;',
    createdAt: new Date(2024, 7, 15, 57, 0, 0),
  },
  {
    _id: '63',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Но вдруг раздался глас приятный',
    createdAt: new Date(2024, 7, 15, 57, 30, 0),
  },
  {
    _id: '64',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И звонких гуслей беглый звук;',
    createdAt: new Date(2024, 7, 15, 58, 30, 0),
  },
  {
    _id: '65',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Все смолкли, слушают Баяна:',
    createdAt: new Date(2024, 7, 15, 59, 30, 0),
  },
  {
    _id: '66',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И славит сладостный певец',
    createdAt: new Date(2024, 7, 16, 0, 30, 0),
  },
  {
    _id: '67',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Людмилу-прелесть, и Руслана,',
    createdAt: new Date(2024, 7, 16, 1, 0, 0),
  },
  {
    _id: '68',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И Лелем свитый им венец.',
    createdAt: new Date(2024, 7, 16, 2, 0, 0),
  },
  {
    _id: '69',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Но, страстью пылкой утомленный,',
    createdAt: new Date(2024, 7, 16, 3, 0, 0),
  },
  {
    _id: '70',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Не ест, не пьет Руслан влюбленный;',
    createdAt: new Date(2024, 7, 16, 4, 0, 0),
  },
  {
    _id: '71',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'На друга милого глядит,',
    createdAt: new Date(2024, 7, 16, 4, 30, 0),
  },
  {
    _id: '72',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Вздыхает, сердится, горит',
    createdAt: new Date(2024, 7, 16, 5, 30, 0),
  },
  {
    _id: '73',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И, щипля ус от нетерпенья,',
    createdAt: new Date(2024, 7, 16, 6, 30, 0),
  },
  {
    _id: '74',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Считает каждые мгновенья.',
    createdAt: new Date(2024, 7, 16, 7, 30, 0),
  },
  {
    _id: '75',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'В уныньи, с пасмурным челом,',
    createdAt: new Date(2024, 7, 16, 8, 0, 0),
  },
  {
    _id: '76',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'За шумным, свадебным столом',
    createdAt: new Date(2024, 7, 16, 9, 0, 0),
  },
  {
    _id: '77',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Сидят три витязя младые;',
    createdAt: new Date(2024, 7, 16, 10, 0, 0),
  },
  {
    _id: '78',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Безмолвны, за ковшом пустым,',
    createdAt: new Date(2024, 7, 16, 11, 0, 0),
  },
  {
    _id: '79',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Забыли кубки круговые,',
    createdAt: new Date(2024, 7, 16, 11, 30, 0),
  },
  {
    _id: '80',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И брашна неприятны им;',
    createdAt: new Date(2024, 7, 16, 12, 30, 0),
  },
  {
    _id: '81',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Не слышат вещего Баяна;',
    createdAt: new Date(2024, 7, 16, 13, 30, 0),
  },
  {
    _id: '82',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Потупили смущенный взгляд:',
    createdAt: new Date(2024, 7, 16, 14, 30, 0),
  },
  {
    _id: '83',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'То три соперника Руслана;',
    createdAt: new Date(2024, 7, 16, 15, 0, 0),
  },
  {
    _id: '84',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'В душе несчастные таят',
    createdAt: new Date(2024, 7, 16, 16, 0, 0),
  },
  {
    _id: '85',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Любви и ненависти яд.',
    createdAt: new Date(2024, 7, 16, 17, 0, 0),
  },
  {
    _id: '86',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Один — Рогдай, воитель смелый,',
    createdAt: new Date(2024, 7, 16, 18, 0, 0),
  },
  {
    _id: '87',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Мечом раздвинувший пределы',
    createdAt: new Date(2024, 7, 16, 18, 30, 0),
  },
  {
    _id: '88',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Богатых киевских полей;',
    createdAt: new Date(2024, 7, 16, 19, 30, 0),
  },
  {
    _id: '89',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Другой — Фарлаф, крикун надменный,',
    createdAt: new Date(2024, 7, 16, 20, 30, 0),
  },
  {
    _id: '90',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'В пирах никем не побежденный,',
    createdAt: new Date(2024, 7, 16, 21, 30, 0),
  },
  {
    _id: '91',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Но воин скромный средь мечей;',
    createdAt: new Date(2024, 7, 16, 22, 0, 0),
  },
  {
    _id: '92',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Последний, полный страстной думы,',
    createdAt: new Date(2024, 7, 16, 23, 0, 0),
  },
  {
    _id: '93',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Младой хазарский хан Ратмир:',
    createdAt: new Date(2024, 7, 16, 24, 0, 0),
  },
  {
    _id: '94',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Все трое бледны и угрюмы,',
    createdAt: new Date(2024, 7, 16, 25, 0, 0),
  },
  {
    _id: '95',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И пир веселый им не в пир.',
    createdAt: new Date(2024, 7, 16, 25, 30, 0),
  },
  {
    _id: '96',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Вот кончен он; встают рядами,',
    createdAt: new Date(2024, 7, 16, 26, 30, 0),
  },
  {
    _id: '97',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Смешались шумными толпами,',
    createdAt: new Date(2024, 7, 16, 27, 30, 0),
  },
  {
    _id: '98',
    author: mockRecipient,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И все глядят на молодых:',
    createdAt: new Date(2024, 7, 16, 28, 30, 0),
  },
  {
    _id: '99',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Невеста очи опустила,',
    createdAt: new Date(2024, 7, 16, 29, 0, 0),
  },
  {
    _id: '100',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'Как будто сердцем приуныла,',
    createdAt: new Date(2024, 7, 16, 30, 0, 0),
  },
  {
    _id: '101',
    author: mockVolunteer,
    title: 'Пушкачат',
    attaches: [],
    chatId: '42',
    body: 'И светел радостный жених.',
    createdAt: new Date(2024, 7, 16, 31, 0, 0),
  },
];
