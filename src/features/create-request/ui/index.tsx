import { Button } from "shared/ui/button";
import { DatePicker } from "shared/ui/date-picker";
import { MainPopup } from "shared/ui/main-popup";
import { Portal } from "shared/ui/portal";

export interface ICreateRequestProps {
  name: string;
  avatarLink: string;
  avatarName: string;
  phoneNumber: string;
  value: Date;
  onChangeValue: (date: Date) => void;
  onClickContinueButton: () => void;
}

export const CreateRequest = ({
  name,
  avatarLink,
  avatarName,
  phoneNumber,
  value,
  onChangeValue,
  onClickContinueButton,
}: ICreateRequestProps) => (
  <Portal>
    <MainPopup
      name={name}
      avatarLink={avatarLink}
      avatarName={avatarName}
      phoneNumber={phoneNumber}
    >
      <DatePicker value={value} onChangeValue={onChangeValue} />
      <Button
        buttonType="primary"
        label="Продолжить"
        onClick={onClickContinueButton}
      />
    </MainPopup>
  </Portal>
);
