export enum UserStatus {
  BLOCKED = -1,
  UNCONFIRMED = 0,
  CONFIRMED = 1,
  VERIFIED = 2,
  ACTIVATED = 3,
}

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'GeneralUser',
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
  conflict = 'conflict',
  confirm = 'confirm',
  phone = 'phone',
  cancel = 'cancel',
}
