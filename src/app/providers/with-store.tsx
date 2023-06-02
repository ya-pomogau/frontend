import type { ComponentType, FunctionComponent } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export const withStore =
  (Component: ComponentType): FunctionComponent =>
  () =>
    (
      <Provider store={store}>
        <Component />
      </Provider>
    );
