import { OverlayingPopup } from 'shared/ui/overlaying-popup';
import { UpdateUserInfo } from 'entities/user/types';
import { EditViewerInfo } from 'features/edit-viewer-info/ui';

interface LightPopupProps {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  onClickSave: (userData: UpdateUserInfo, avatarFile: FormData) => void;
  onClickExit: () => void;
  valueName: string;
  valuePhone: string;
  valueAddress: string;
  valueId: number;
  isPopupOpen: boolean;
}

export const LightPopup = ({ isPopupOpen, ...props }: LightPopupProps) => {
  return (
    <OverlayingPopup isOpened={isPopupOpen}>
      <EditViewerInfo {...props} />
    </OverlayingPopup>
  );
};
