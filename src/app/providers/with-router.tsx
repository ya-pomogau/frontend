import type { ComponentType, FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";

export function withRouter(WrappedComponent: ComponentType): FunctionComponent {
  return function wrappedComponenet() {
    return (
      <BrowserRouter>
        <WrappedComponent />
      </BrowserRouter>
    );
  };
}
