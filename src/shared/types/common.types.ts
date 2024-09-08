export type ValueOf<T> = T[keyof T];

export const UserStatus = {
  BLOCKED: -1,
  UNCONFIRMED: 0,
  CONFIRMED: 1,
  VERIFIED: 2,
  ACTIVATED: 3,
} as const;

export type UserStatus = ValueOf<typeof UserStatus>;

export const UserRole = {
  ADMIN: 'Admin',
  RECIPIENT: 'Recipient',
  VOLUNTEER: 'Volunteer',
} as const;

export type UserRole = ValueOf<typeof UserRole>;

export const AdminPermission = {
  CONFIRMATION: 'CONFIRM_USER',
  TASKS: 'CREATE_TASK',
  KEYS: 'GIVE_KEY',
  CONFLICTS: 'RESOLVE_CONFLICT',
  BLOG: 'EDIT_BLOG',
  CATEGORIES: 'SET_CATEGORY_POINTS',
} as const;

export type AdminPermission = ValueOf<typeof AdminPermission>;

export const VariantCheckbox = {
  DATE: 'date',
  DECREASINGPOINTS: 'decreasingPoints',
  INCREASINGPOINTS: 'increasingPoints',
} as const;

export type VariantCheckbox = ValueOf<typeof VariantCheckbox>;
export const TaskButtonType = {
  close: 'close',
  responded: 'responded',
  conflict: 'conflict',
  confirm: 'confirm',
  phone: 'phone',
  cancel: 'cancel',
} as const;

export type TaskButtonType = ValueOf<typeof TaskButtonType>;

export const ModalContentType = {
  close: 'close',
  conflict: 'conflict',
  confirm: 'confirm',
  phone: 'phone',
  cancel: 'cancel',
  responded: 'responded',
  admin: 'admin',
  unfulfilled: 'unfulfilled',
} as const;

export type ModalContentType = ValueOf<typeof ModalContentType>;

export const Tabs = {
  VOLUNTEERS: 'volunteers',
  RECIPIENTS: 'recipients',
  NOTPROCESSED: 'notprocessed',
  ADMINS: 'admins',
} as const;

export type Tabs = ValueOf<typeof Tabs>;

export type TContacts = {
  email: string | null | undefined;
  socialNetwork: string | null | undefined;
};

export type TPoints<T extends string> = {
  [key in T]: number;
};

export const FileTypes = {
  JPG: '.jpg',
  JPEG: '.jpeg',
  PNG: '.png',
} as const;

export type FileTypes = ValueOf<typeof FileTypes>;
