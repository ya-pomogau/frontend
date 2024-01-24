export enum UserStatus {
  UNCONFIRMED = 0,
  CONFIRMED = 1,
  VERIFIED = 2,
  ACTIVATED = 3,
}

export enum UserRole {
  ADMIN = 'Admin',
  MASTER = 'Master',
  RECIPIENT = 'Recipient',
  VOLUNTEER = 'Volunteer',
}

export enum AdminPermission {
  CONFIRMATION = 'confirm users',
  TASKS = 'create tasks',
  KEYS = 'give keys',
  CONFLICTS = 'resolve conflicts',
  BLOG = 'write the blog',
  CATEGORIES = 'change categories',
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
