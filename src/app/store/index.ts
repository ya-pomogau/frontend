import { configureStore } from '@reduxjs/toolkit';

import { userModel } from 'entities/user/model';
import { createRequestModel } from 'features/create-request/model/create-request';
import { usersApi } from 'services/user-api';
import { tasksApi } from 'services/tasks-api';
import { authAdminApi } from 'services/auth-admin-api';
import { categoriesApi } from 'services/categories-api';
import { errorModel } from 'entities/error/model';
import systemSliceReducer from '../../services/system-slice';
import { chatModel } from '../../widgets/chats/model/chat';
import { conflictModel } from '../../widgets/chats/model/conflict';
import systemSliceReducer from '../../services/system-slice';

export const store = configureStore({
  reducer: {
    error: errorModel.reducer,
    user: userModel.reducer,
    chats: chatModel.reducer,
    conflicts: conflictModel.reducer,
    createRequest: createRequestModel.reducer,
    system: systemSliceReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authAdminApi.reducerPath]: authAdminApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(tasksApi.middleware)
      .concat(authAdminApi.middleware)
      .concat(categoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
