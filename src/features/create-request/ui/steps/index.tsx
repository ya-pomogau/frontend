import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { closePopup } from "features/create-request/model";
import { MainPopup } from "shared/ui/main-popup";
import { OverlayingPopup } from "shared/ui/overlaying-popup";
import { Portal } from "shared/ui/portal";
import { CurrentPage } from "../../types";
import { AddressStep } from "./address-step/address-step";
import { CommonStep } from "./common-step/common-step";
import { DateStep } from "./date-step/date-step";
import { TaskStep } from "./task-step/task-step";

export interface RequestProps {
  tasks: Array<{ value: string; label: string }>;
  isMobile?: boolean;
}

export const Request = ({ tasks, isMobile = true }: RequestProps) => {
  const dispatch = useAppDispatch();
  const { avatarLink, name, phoneNumber, currentStep, isPopupOpen } =
    useAppSelector((state) => state.createRequest);

  const handleCloseClick = () => {
    dispatch(closePopup());
  };

  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      dispatch(closePopup());
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeByEsc);
    return () => {
      document.removeEventListener("keydown", closeByEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Portal isOpened={isPopupOpen}>
      <OverlayingPopup isOpened={isPopupOpen} onClose={handleCloseClick}>
        <MainPopup
          name={name}
          avatarLink={avatarLink}
          avatarName={name}
          phoneNumber={phoneNumber}
          handleCloseClick={handleCloseClick}
          isMobile={isMobile}
        >
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
        </MainPopup>
      </OverlayingPopup>
    </Portal>
  );
};
