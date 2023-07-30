import { OverlayingPopup } from 'shared/ui/overlaying-popup';
import { UpdateUserInfo } from 'entities/user/types';
import { LightPopup } from 'shared/ui/light-popup';

interface EditViewerInfoProps {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  handlerAvatar: () => void;
  onClickSave: (values: UpdateUserInfo) => void;
  onClickExit: () => void;
  valueName: string;
  valuePhone: string;
  valueAddress: string;
  valueId: number;
  isPopupOpen: boolean;
}

export const EditViewerInfo = ({
  isPopupOpen,
  ...props
}: EditViewerInfoProps) => {
  return (
    <OverlayingPopup isOpened={isPopupOpen}>
      <LightPopup {...props} />
    </OverlayingPopup>
  );
};
