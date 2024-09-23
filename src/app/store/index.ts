import { configureStore } from '@reduxjs/toolkit';

import { userModel } from 'entities/user/model';
import { createRequestModel } from 'features/create-request/model/create-request';
import { usersApi } from 'services/user-api';
import { contactsApi } from 'services/contacts-api';
import { categoriesApi } from 'services/categories-api';
import { errorModel } from 'entities/error/model';
import systemSliceReducer from '../../services/system-slice';
import { userTasksApi } from 'services/user-task-api';
import { adminsApi } from 'services/admin-api';
import { postsApi } from 'services/posts-api';
import { websocketMiddleware } from 'services/websocket-middleware';

export const store = configureStore({
  reducer: {
    error: errorModel.reducer,
    user: userModel.reducer,
    createRequest: createRequestModel.reducer,
    system: systemSliceReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    [userTasksApi.reducerPath]: userTasksApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [adminsApi.reducerPath]: adminsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(contactsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(userTasksApi.middleware)
      .concat(adminsApi.middleware)
      .concat(postsApi.middleware)
      .concat(websocketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
