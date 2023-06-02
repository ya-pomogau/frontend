import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { viewerModel } from "entities/viewer/model";

const rootReducer = combineReducers({
  viewer: viewerModel.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type StoreState = ReturnType<typeof rootReducer>;
