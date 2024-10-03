export type ValueOf<T> = T[keyof T];

export const userStatus = {
  BLOCKED: -1,
  UNCONFIRMED: 0,
  CONFIRMED: 1,
  VERIFIED: 2,
  ACTIVATED: 3,
} as const;

export type UserStatus = ValueOf<typeof userStatus>;

export const userRole = {
  ADMIN: 'Admin',
  RECIPIENT: 'Recipient',
  VOLUNTEER: 'Volunteer',
} as const;

export type UserRole = ValueOf<typeof userRole>;

export const adminPermission = {
  CONFIRMATION: 'CONFIRM_USER',
  TASKS: 'CREATE_TASK',
  KEYS: 'GIVE_KEY',
  CONFLICTS: 'RESOLVE_CONFLICT',
  BLOG: 'EDIT_BLOG',
  CATEGORIES: 'SET_CATEGORY_POINTS',
} as const;

export type AdminPermission = ValueOf<typeof adminPermission>;

export const variantCheckbox = {
  DATE: 'date',
  DECREASINGPOINTS: 'decreasingPoints',
  INCREASINGPOINTS: 'increasingPoints',
} as const;

export type VariantCheckbox = ValueOf<typeof variantCheckbox>;

export const taskButtonType = {
  close: 'close',
  responded: 'responded',
  conflict: 'conflict',
  confirm: 'confirm',
  phone: 'phone',
  cancel: 'cancel',
  message: 'message',
} as const;

export type TaskButtonType = ValueOf<typeof taskButtonType>;

export const modalContentType = {
  close: 'close',
  conflict: 'conflict',
  confirm: 'confirm',
  phone: 'phone',
  cancel: 'cancel',
  responded: 'responded',
  admin: 'admin',
  unfulfilled: 'unfulfilled',
} as const;

export type ModalContentType = ValueOf<typeof modalContentType>;

export const tabs = {
  VOLUNTEERS: 'volunteers',
  RECIPIENTS: 'recipients',
  NOTPROCESSED: 'notprocessed',
  ADMINS: 'admins',
} as const;

export type Tabs = ValueOf<typeof tabs>;

export type TContacts = {
  email: string | null | undefined;
  socialNetwork: string | null | undefined;
};

export type TPoints<T extends string> = {
  [key in T]: number;
};

export const fileTypes = {
  JPG: '.jpg',
  JPEG: '.jpeg',
  PNG: '.png',
} as const;

export type FileTypes = ValueOf<typeof fileTypes>;
