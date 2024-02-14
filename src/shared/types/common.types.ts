export enum UserStatus {
  BLOCKED = -1,
  UNCONFIRMED = 0,
  CONFIRMED = 1,
  VERIFIED = 2,
  ACTIVATED = 3,
}

export enum UserRole {
  ADMIN = 'Admin',
  RECIPIENT = 'Recipient',
  VOLUNTEER = 'Volunteer',
}

export enum AdminPermission {
  CONFIRMATION = 'CONFIRM_USER',
  TASKS = 'CREATE_TASK',
  KEYS = 'GIVE_KEY',
  CONFLICTS = 'RESOLVE_CONFLICT',
  BLOG = 'EDIT_BLOG',
  CATEGORIES = 'SET_CATEGORY_POINTS',
}

export enum VariantCheckbox {
  DATE = 'date',
  DECREASINGPOINTS = 'decreasingPoints',
  INCREASINGPOINTS = 'increasingPoints',
}
export enum TaskButtonType {
  close = 'close',
  responded = 'responded',
  conflict = 'conflict',
  confirm = 'confirm',
  phone = 'phone',
}

export enum ModalContentType {
  close = 'close',
  conflict = 'conflict',
  confirm = 'confirm',
  phone = 'phone',
  cancel = 'cancel',
  responded = 'responded',
  admin = 'admin',
  unfulfilled = 'unfulfilled',
}

export enum Tabs {
  VOLUNTEERS = 'volunteers',
  RECIPIENTS = 'recipients',
  NOTPROCESSED = 'notprocessed',
  ADMINS = 'admins',
}

export enum Tabs {
  VOLUNTEERS = 'volunteers',
  RECIPIENTS = 'recipients',
  NOTPROCESSED = 'notprocessed',
  ADMINS = 'admins',
}
