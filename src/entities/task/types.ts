import { UserProfile } from 'entities/user/types';
import { UserStatus, ValueOf } from 'shared/types/common.types';
import { PointGeoJSONInterface } from 'shared/types/point-geojson.types';

export const taskStatus = {
  CREATED: 'created', // только созданная заявка
  ACCEPTED: 'accepted', //взятая в работу волонтером
  COMPLETED: 'completed', //выполненная
  CONFLICTED: 'conflicted', //конфликтная заявка
} as const;

export type TaskStatus = ValueOf<typeof taskStatus>;

export const resolveStatus = {
  VIRGIN: 'virgin', //конфликт есть, но не взят в работу.
  PENDING: 'pending', //конфликт есть и взят в работу.
  FULFILLED: 'fulfilled', //конфликт разрешён как "Выполнено"
  REJECTED: 'rejected', //конфликт разрешён как "Не выполнено"
} as const;

export type ResolveStatus = ValueOf<typeof resolveStatus>;

export const taskReport = {
  FULFILLED: 'fulfilled', //отмечана как выполненная
  REJECTED: 'rejected', //отмечана как не выполненная
} as const;

export type TaskReport = ValueOf<typeof taskReport>;

export type Category = {
  _id: string;
  title: string;
  points: number;
  accessLevel: UserStatus; // категория будет доступна, если статус пользователя больше или равен accessLevel категории
};

export type Task = {
  _id: string;
  description: string;
  address: string;
  location: PointGeoJSONInterface;
  status: TaskStatus;
  category: Category;
  date: string | null;
  recipient: UserProfile;
  recipientReport: TaskReport | null;
  volunteer: UserProfile | null;
  volunteerReport: TaskReport | null;
  adminResolve: ResolveStatus | null; // null - вмешательства не требуется админа.
  isPendingChanges: boolean; //показывает что один участник ответил по выполнению заявки
  moderator: UserProfile | null; //указывает на админа который решает конфликт
};

export type TaskConflict = Omit<
  Task,
  'volunteer' | 'recipientReport' | 'volunteerReport'
> & {
  volunteer: UserProfile;
  recipientReport: TaskReport;
  volunteerReport: TaskReport;
};
