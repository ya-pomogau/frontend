import { configureStore } from '@reduxjs/toolkit';

import { userModel } from 'entities/user/model';
import { taskModel } from 'entities/task/model';
import { createRequestModel } from 'features/create-request/model/create-request';
import { usersApi } from 'services/user-api';
import { tasksApi } from 'services/tasks-api';
import { authApi } from 'services/auth-api';

export const store = configureStore({
  reducer: {
    user: userModel.reducer,
    //tasks: taskModel.reducer,
    createRequest: createRequestModel.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(tasksApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
