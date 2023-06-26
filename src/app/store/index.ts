import { configureStore } from "@reduxjs/toolkit";
import { viewerModel } from "entities/viewer/model";
import { createRequestModel } from "features/create-request/model/create-request";

export const store = configureStore({
  reducer: {
    user: viewerModel.reducer,
    createRequest: createRequestModel.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
