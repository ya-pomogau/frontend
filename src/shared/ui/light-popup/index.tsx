import { OverlayingPopup } from 'shared/ui/overlaying-popup';
import { ReactNode } from 'react';

interface LightPopupProps {
  extClassName?: string;
  onClickExit: () => void;
  children: ReactNode;
  isPopupOpen: boolean;
}

export const LightPopup = ({
  children,
  isPopupOpen,
  onClickExit,
  extClassName,
}: LightPopupProps) => {
  return (
    <OverlayingPopup
      extClassName={extClassName}
      isOpened={isPopupOpen}
      onClose={onClickExit}
    >
      {children}
    </OverlayingPopup>
  );
};
