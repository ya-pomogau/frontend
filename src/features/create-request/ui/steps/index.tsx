import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { closePopup } from "features/create-request/model";
import { MainPopup } from "shared/ui/main-popup";
import { Data } from "shared/ui/map/types";
import { OverlayingPopup } from "shared/ui/overlaying-popup";
import { Portal } from "shared/ui/portal";
import { CurrentPage } from "../../types";
import { AddressStep } from "./address-step/address-step";
import { CommonStep } from "./common-step/common-step";
import { DateStep } from "./date-step/date-step";
import { TaskStep } from "./task-step/task-step";

export interface ICreateRequestProps {
  tasks: Array<{ value: string; label: string }>;
  isMobile: boolean;
}

export const CreateRequest = ({
  tasks,
  isMobile = true,
}: ICreateRequestProps) => {
  const dispatch = useAppDispatch();

  const { avatarLink, name, phoneNumber, currentStep, isPopupOpen } =
    useAppSelector((state: RootState) => state.createRequest);

  const handleCloseClick = () => {
    dispatch(closePopup());
  };

  return isMobile ? (
    <div>
      {currentStep === CurrentPage.DATE_STEP && <DateStep />}
      {currentStep === CurrentPage.ADDRESS_STEP && (
        <AddressStep isMobile={isMobile} />
      )}
      {currentStep === CurrentPage.TASK_STEP && (
        <TaskStep tasks={tasks} isMobile={isMobile} />
      )}
      {currentStep === CurrentPage.COMMON_STEP && (
        <CommonStep isMobile={isMobile} />
      )}
    </div>
  ) : (
    <Portal isOpened={isPopupOpen}>
      <OverlayingPopup isOpened={isPopupOpen}>
        <MainPopup
          name={name}
          avatarLink={avatarLink}
          avatarName={name}
          phoneNumber={phoneNumber}
          handleCloseClick={handleCloseClick}
        >
          {currentStep === CurrentPage.DATE_STEP && <DateStep />}
          {currentStep === CurrentPage.ADDRESS_STEP && <AddressStep />}
          {currentStep === CurrentPage.TASK_STEP && <TaskStep tasks={tasks} />}
          {currentStep === CurrentPage.COMMON_STEP && <CommonStep />}
        </MainPopup>
      </OverlayingPopup>
    </Portal>
  );
};
