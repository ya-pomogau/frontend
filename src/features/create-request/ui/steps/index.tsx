import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setCategoryList,
  closePopup,
  clearState,
} from 'features/create-request/model';
import { MainPopup } from 'shared/ui/main-popup';
import { OverlayingPopup } from 'shared/ui/overlaying-popup';
import { CurrentPage } from '../../types';

import { AddressStep } from './address-step/address-step';
import { CommonStep } from './common-step/common-step';
import { DateStep } from './date-step/date-step';
import { TaskStep } from './task-step/task-step';
import { useGetCategoriesQuery } from 'services/categories-api';
import { Tooltip } from '../../../../shared/ui/tooltip';
import styles from './styles.module.css';
import { CloseCrossIcon } from '../../../../shared/ui/icons/close-cross-icon';
import { SquareButton } from '../../../../shared/ui/square-buttons';
import { Button } from '../../../../shared/ui/button';

export interface RequestProps {
  isMobile?: boolean;
}

export const Request = ({ isMobile = true }: RequestProps) => {
  const dispatch = useAppDispatch();
  const { currentStep, isPopupOpen } = useAppSelector(
    (state) => state.createRequest
  );
  const data = useAppSelector((state) => state.user.data);
  const { data: categories } = useGetCategoriesQuery('');
  const [isOpen, setIsOpen] = useState(false);
  const [popupPosion, setPopupPosion] = useState({ top: 0, right: 0 });
  const myRef = useRef<HTMLDivElement>(null);
  //
  const calculateFilterPosition = useCallback(() => {
    const buttonRect = myRef.current?.getBoundingClientRect();

    if (buttonRect) {
      setPopupPosion({ top: buttonRect.bottom, right: buttonRect.right });
    }
  }, []);
  //
  // useEffect(() => {
  //   window.addEventListener('resize', calculateFilterPosition);
  //
  //   return () => {
  //     window.removeEventListener('resize', calculateFilterPosition);
  //   };
  // }, []);
  //
  // const popupPositionStyles = {
  //   top: `${popupPosion.top + 520}px`,
  //   right: `${window.innerWidth - popupPosion.right - 900}px`,
  // };
  const handleCloseClick = () => {
    dispatch(closePopup());
    dispatch(clearState());
    console.log('close');
  };

  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(closePopup());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    dispatch(setCategoryList(categories));

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  if (!data) return null;

  return (
    <OverlayingPopup isOpened={isPopupOpen} onClose={handleCloseClick}>
      <MainPopup
        name={data.fullname}
        avatarLink={data.avatar}
        avatarName={data.fullname}
        phoneNumber={data.phone}
        handleCloseClick={() => setIsOpen(true)}
        isMobile={isMobile}
      >
        {isOpen && (
          <Tooltip
            visible
            extClassName={styles.modal}
            pointerPosition="right"
            // changeVisible={handleDeniedAccess}
            // elementStyles={popupPositionStyles}
          >
            <div className={styles.closeWrapper}></div>
            <div className={styles.text}>
              Закрыть окно сейчас и удалить ранее внесенную информацию?
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                buttonType="primary"
                label="Вернуться"
                onClick={() => setIsOpen(false)}
              />
              <Button
                buttonType="primary"
                label="Закрыть"
                onClick={handleCloseClick}
              />
            </div>
          </Tooltip>
        )}
        {currentStep === CurrentPage.DATE_STEP && (
          <DateStep isMobile={isMobile} />
        )}
        {currentStep === CurrentPage.ADDRESS_STEP && (
          <AddressStep isMobile={isMobile} />
        )}
        {currentStep === CurrentPage.TASK_STEP && (
          <TaskStep isMobile={isMobile} />
        )}
        {currentStep === CurrentPage.COMMON_STEP && (
          <CommonStep isMobile={isMobile} />
        )}
      </MainPopup>
    </OverlayingPopup>
  );
};
