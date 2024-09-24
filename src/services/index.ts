export {
  adminsApi,
  useGetUserByRolesQuery,
  useGetUnconfirmedUsersQuery,
  useGetAllAdminsQuery,
  useConfirmUserMutation,
  usePromoteUserMutation,
  useGetTasksConfilctQuery,
  useGetTasksWorkConflictQuery,
  useTakeConflictTaskMutation,
  useResolСonflictMutation,
  useUpdateContactsMutation,
  useCreateNewAdminMutation,
  useAddAdminPrivilegiesMutation,
  useBlockAdminMutation,
  useBlockUserMutation,
} from './admin-api';

export { authApi } from './auth';

export {
  categoriesApi,
  useGetCategoriesQuery,
  useUpdatePointsMutation,
} from './categories-api';

export { contactsApi, useGetContactsQuery } from './contacts-api';

export {
  postsApi,
  useGetPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} from './posts-api';

export {
  usersApi,
  useGetAdminUserByIdQuery,
  useGetAdminUserTasksByIdQuery,
  useUpdateUserProfileMutation,
} from './user-api';

export {
  userTasksApi,
  useGetTaskActiveQuery,
  useGetTaskCompletedQuery,
  useGetTaskVirginQuery,
  useCreateTaskMutation,
  useResponseTaskMutation,
  useFulfillTaskMutation,
  useRejectTaskMutation,
  useGetTaskQuery,
  useCancelTaskMutation,
} from './user-task-api';

export {
  isPendingSelector,
  isNewSelector,
  userSelector,
  vkUserSelector,
  hasPrivilegesSelector,
  isRootSelector,
  permissionsSelector,
  userLoginThunk,
  adminLoginThunk,
  newUserThunk,
  checkTokenThunk,
} from './system-slice';

export { websocketMiddleware } from './websocket-middleware';
