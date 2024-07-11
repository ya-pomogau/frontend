import { ReactNode } from 'react';
import {createPortal} from 'react-dom';

interface IPortalProps {
  children: ReactNode;
  isOpened: boolean;
}

const modalRoot = document.getElementById('modal') as HTMLElement;

export const Portal = ({ children, isOpened }: IPortalProps) => {
  if (!isOpened) {
    return null;
  }

  return createPortal(children, modalRoot);
};
