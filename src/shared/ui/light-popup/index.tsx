import { OverlayingPopup } from 'shared/ui/overlaying-popup';
import { ReactNode } from 'react';

interface LightPopupProps {
  onClickExit: () => void;
  children: ReactNode;
  isPopupOpen: boolean;
}

export const LightPopup = ({
  children,
  isPopupOpen,
  onClickExit,
}: LightPopupProps) => {
  return (
    <OverlayingPopup isOpened={isPopupOpen} onClose={onClickExit}>
      {children}
    </OverlayingPopup>
  );
};
