import { UserRole } from 'shared/types/common.types';

export const FilterItemsIds = {
  ALL: 'all',
  VOLUNTEER: UserRole.VOLUNTEER,
  RECIPIENT: UserRole.RECIPIENT,
  UNHANDLED: 'unhandled',
  CATEGORY_1: '1',
  CATEGORY_2: '2',
  CATEGORY_3: '3',
  CATEGORY_4: '4',
  CATEGORY_5: '5',
  CATEGORY_6: '6',
  RADIUS_1: '1',
  RADIUS_3: '3',
  RADIUS_5: '5',
  SHOW_BY_DATE: 'showByDate',
  SERVIS_1: 'Сопровождение',
  SERVIS_2: 'Перевозка в личном транспорте',
  SERVIS_3: 'Покупка продуктов',
  SERVIS_4: 'Помощь в подъёме/спуске',
  SERVIS_5: 'Покупка вещей/техники',
  SERVIS_6: 'Помощь в готовке',
  SERVIS_7: 'Помощь в уборке',
  SERVIS_8: 'Организация досуга',
  SERVIS_9: 'Ремонт техники/жилья',
};

export const defaultObjFilteres = {
  sortBy: '',
  categories: [],
  searchRadius: '5',
  date: '',
  time: ['00:00', '00:00'],
  userCategories: '',
};
