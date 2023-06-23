/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface IPortalProps {
  children: ReactNode;
  isOpened: boolean;
}

export const Portal = ({ children, isOpened }: IPortalProps) => {
  if (isOpened === false) {
    return null;
  }

  return ReactDOM.createPortal(children, document.body);
};
