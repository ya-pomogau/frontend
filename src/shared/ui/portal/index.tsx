import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface IPortalProps {
  children: ReactNode;
}

export const Portal = ({ children }: IPortalProps) =>
  ReactDOM.createPortal(children, document.body);
