import { configureStore } from "@reduxjs/toolkit";
import { viewerModel } from "entities/viewer/model";

export const store = configureStore({
  reducer: {
    viewer: viewerModel.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
