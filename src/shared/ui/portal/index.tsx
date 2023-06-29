import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface IPortalProps {
  children: ReactNode;
  isOpened: boolean;
}

export const Portal = ({ children, isOpened }: IPortalProps) => {
  if (!isOpened) {
    return null;
  }

  return ReactDOM.createPortal(children, document.body);
};
