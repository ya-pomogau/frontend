// Части маршрута чатов
const UNREVIEWED = '/unreviewed';
const IN_WORK = '/in-work';
const COMPLETED = '/completed';

export const Routes = {
  ROOT: '/',
  PROFILE: '/profile',
  BLOG: '/blog',
  POLICY: '/policy',
  CONTACTS: '/contacts',
  PICK: '/pick',
  REGISTER: '/register',
  LOGIN: '/login',
  VK_AUTH: '/vk-auth',
  OUT: '/out',
  PROFILE_MAP: '/profile/map',
  PROFILE_ACTIVE: '/profile/active',
  PROFILE_COMPLETED: '/profile/completed',
  PROFILE_REQUESTS: '/profile/requests',
  PROFILE_REQUESTS_VOLUNTEERS: '/profile/requests/volunteers',
  PROFILE_REQUESTS_RECIPIENTS: '/profile/requests/recipients',
  PROFILE_REQUESTS_NOTPROCESSED: '/profile/requests/notprocessed',
  PROFILE_STATISTICS: '/profile/statistics',
  PROFILE_STATISTICS_APPLICATIONS: '/profile/statistics/applications',
  PROFILE_STATISTICS_USERS: '/profile/statistics/users',
  PROFILE_TASKS: '/profile/tasks',
  PROFILE_TASKS_RECIPIENTS: '/profile/tasks/recipients',
  PROFILE_TASKS_VOLUNTEERS: '/profile/tasks/volunteers',
  PROFILE_TASKS_RECIPIENTS_USERID: '/profile/tasks/recipients/:userId',
  PROFILE_TASKS_VOLUNTEERS_USERID: '/profile/tasks/volunteers/:userId',
  PROFILE_BIDS: '/profile/bids',
  CHAT_HUB: '/chats-hub',
  CHAT_HUB_UNREVIEWED: '/chats-hub' + UNREVIEWED,
  CHAT_HUB_IN_WORK: '/chats-hub' + IN_WORK,
  CHAT_HUB_COMPLETED: '/chats-hub' + COMPLETED,
  CHAT_CONFLICT: '/chats-conflict',
  CHAT_CONFLICT_UNREVIEWED: '/chats-conflict' + UNREVIEWED,
  CHAT_CONFLICT_IN_WORK: '/chats-conflict' + IN_WORK,
  CHAT_CONFLICT_COMPLETED: '/chats-conflict' + COMPLETED,
  // части маршрутов чата
  CHAT_SUB_UNREVIEWED: UNREVIEWED,
  CHAT_SUB_IN_WORK: IN_WORK,
  CHAT_SUB_COMPLETED: COMPLETED,
  // -----------------------
  PROFILE_REQUESTS_ADMINS: '/profile/requests/admins',
  PROFILE_CREATE_NEW_ADMIN: '/profile/create-new-admin',
  NOT_FOUND: '*',
} as const;
