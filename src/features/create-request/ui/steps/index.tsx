import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setCategoryList,
  closePopup,
  clearState,
  changeCurrentStep,
  openPopup,
  setAddress,
  setCategory,
  setDescriptionForTask,
  setTime,
  setDate,
  setTermlessRequest,
} from 'features/create-request/model';
import { MainPopup } from 'shared/ui/main-popup';
import { OverlayingPopup } from 'shared/ui/overlaying-popup';
import { currentPage } from '../../types';

import { AddressStep } from './address-step/address-step';
import { CommonStep } from './common-step/common-step';
import { DateStep } from './date-step/date-step';
import { TaskStep } from './task-step/task-step';
import { useGetCategoriesQuery } from 'services/categories-api';
import { Tooltip } from '../../../../shared/ui/tooltip';
import styles from './styles.module.css';
import { Button } from '../../../../shared/ui/button';
import { format } from 'date-fns';

export interface RequestProps {
  isMobile?: boolean;
}
export const Request = ({ isMobile = true }: RequestProps) => {
  const dispatch = useAppDispatch();
  const {
    currentStep,
    isPopupOpen,
    isTypeEdit,
    temporaryAddress,
    temporaryCoordinates,
    temporaryDescriptionForTask,
    temporaryDate,
    temporaryTime,
    temporaryCategory,
  } = useAppSelector((state) => state.createRequest);
  const data = useAppSelector((state) => state.user.data);
  const { data: categories } = useGetCategoriesQuery();

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseClick = () => {
    if (isTypeEdit && currentStep !== 4) {
      if (temporaryDate !== null) {
        dispatch(setDate(format(new Date(temporaryDate!), 'dd.MM.yyyy')));
        dispatch(setTime(temporaryTime!));
      } else {
        dispatch(setTermlessRequest(true));
        dispatch(setTime(''));
      }
      dispatch(
        setAddress({
          additinalAddress: temporaryAddress,
          coords: temporaryCoordinates,
        })
      );
      dispatch(setDescriptionForTask(temporaryDescriptionForTask));
      dispatch(setCategory(temporaryCategory));
      dispatch(closePopup());
      dispatch(changeCurrentStep(4));
      dispatch(openPopup());
      setIsOpen(false);
    } else {
      dispatch(clearState());
      dispatch(closePopup());
    }
  };

  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(closePopup());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setCategoryList(categories));
  }, []);

  if (!data) return null;

  return (
    <OverlayingPopup
      isOpened={isPopupOpen}
      onClose={isOpen ? undefined : handleCloseClick}
    >
      <div id="mainPopupOuterDiv" className={styles.mainPopupOuterDiv}>
        <MainPopup
          name={data.name}
          avatarLink={data.avatar}
          avatarName={data.name}
          phoneNumber={data.phone}
          handleCloseClick={() => setIsOpen(true)}
          isMobile={isMobile}
          extClassName={isMobile ? styles.mainPopUpWrapperMobile : undefined}
        >
          {isOpen && (
            <div className={styles.tooltipOverlay}>
              <Tooltip
                visible
                extClassName={isMobile ? styles.modalMobile : styles.modal}
                pointerPosition="right"
                elementStyles={{
                  zIndex: 11,
                  width: 343,
                  padding: 0,
                }}
                idForModalRoot="mainPopupOuterDiv"
              >
                <div className={styles.tooltipContent}>
                  <p className={styles.text}>
                    Закрыть окно сейчас и удалить ранее внесенную информацию?
                  </p>
                  <div className={styles.buttonWrapper}>
                    <Button
                      buttonType="secondary"
                      label="Вернуться"
                      onClick={() => setIsOpen(false)}
                      extClassName={styles.button}
                    />
                    <Button
                      buttonType="primary"
                      label="Закрыть"
                      onClick={handleCloseClick}
                      extClassName={styles.button}
                    />
                  </div>
                </div>
              </Tooltip>
            </div>
          )}

          {currentStep === currentPage.DATE_STEP && (
            <DateStep isMobile={isMobile} />
          )}
          {currentStep === currentPage.ADDRESS_STEP && (
            <AddressStep isMobile={isMobile} />
          )}
          {currentStep === currentPage.TASK_STEP && (
            <TaskStep isMobile={isMobile} />
          )}
          {currentStep === currentPage.COMMON_STEP && (
            <CommonStep isMobile={isMobile} />
          )}
        </MainPopup>
      </div>
    </OverlayingPopup>
  );
};
