import { configureStore } from '@reduxjs/toolkit';

import {
  postsApi,
  categoriesApi,
  usersApi,
  userTasksApi,
  adminsApi,
  contactsApi,
  websocketMiddleware,
} from 'services';
import { filterDataModel } from 'features/filter/model/filtrer-data';
import { userModel } from 'entities/user/model';
import { errorModel } from 'entities/error/model';
import { createRequestModel } from 'features/create-request/model/create-request';
import systemSliceReducer from '../../services/system-slice';

export const store = configureStore({
  reducer: {
    error: errorModel.reducer,
    user: userModel.reducer,
    createRequest: createRequestModel.reducer,
    filterData: filterDataModel.reducer,
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
