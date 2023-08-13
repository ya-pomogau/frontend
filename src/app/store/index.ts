import { configureStore } from '@reduxjs/toolkit';

import { userModel } from 'entities/user/model';
import { taskModel } from 'entities/task/model';
import { createRequestModel } from 'features/create-request/model/create-request';
import { userApi } from 'services/user-api';

export const store = configureStore({
  reducer: {
    user: userModel.reducer,
    tasks: taskModel.reducer,
    createRequest: createRequestModel.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
