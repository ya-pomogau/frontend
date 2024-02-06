import { UserProfile } from 'entities/user/types';
import { UserStatus } from 'shared/types/common.types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';

export enum TaskStatus {
  CREATED = 'created', // только созданная заявка
  ACCEPTED = 'accepted', //взятая в работу волонтером
  COMPLETED = 'completed', //выполненная
  CONFLICTED = `conflicted`, //конфликтная заявка
}
export enum ResolveStatus {
  VIRGIN = 'virgin', //конфликт есть, но не взят в работу.
  PENDING = 'pending', //конфликт есть и взят в работу.
  FULFILLED = 'fulfilled', //конфликт разрешён как "Выполнено"
  REJECTED = 'rejected', //конфликт разрешён как "Не выполнено"
}
export enum TaskReport {
  FULFILLED = 'fulfilled', //отмечана как выполненная
  REJECTED = 'rejected', //отмечана как не выполненная
}

export type Category = {
  id: string;
  title: string;
  points: number;
  accessLevel: UserStatus; // категория будет доступна, если статус пользователя больше или равен accessLevel категории
};

export type Task = {
  _id: string;
  description: string;
  address: string;
  location: GeoCoordinates;
  status: TaskStatus;
  category: Category;
  date: string | null;
  recipient: UserProfile;
  recipientReport: TaskReport | null;
  volunteer: UserProfile | null;
  volunteerReport: TaskReport | null;
  adminResolve: ResolveStatus | null; // null - вмешательства не требуется админа.
  isPendingChanges: boolean; //показывает что один участник ответил по выполнению заявки
};
