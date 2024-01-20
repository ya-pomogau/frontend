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

interface Coords {
  right: number;
  top: number;
}

export const Request = ({ isMobile = true }: RequestProps) => {
  const dispatch = useAppDispatch();
  const { currentStep, isPopupOpen } = useAppSelector(
    (state) => state.createRequest
  );
  const data = useAppSelector((state) => state.user.data);
  const { data: categories } = useGetCategoriesQuery('');
  const [isOpen, setIsOpen] = useState(false);
  const [popupPosion, setPopupPosion] = useState<Coords | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popupClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const getCoords = () => {
    const box = buttonRef.current?.getBoundingClientRect();

    if (box) {
      setPopupPosion({
        right: window.innerWidth - box.right - box.width * 0.7,
        top: box.top + window.scrollY + box.height * 0.6,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', getCoords);

    return () => {
      window.removeEventListener('resize', getCoords);
    };
  }, []);
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
      <div ref={buttonRef}>
        <MainPopup
          name={data.fullname}
          avatarLink={data.avatar}
          avatarName={data.fullname}
          phoneNumber={data.phone}
          handleCloseClick={() => setIsOpen(true)}
          isMobile={isMobile}
        >
          {isOpen && (
            <OverlayingPopup isOpened={isOpen} onClose={handleCloseClick}>
              <div>
                <Tooltip
                  visible
                  extClassName={styles.modal}
                  pointerPosition="right"
                  // elementStyles={{
                  //   position: 'absolute',
                  //   top: `${popupPosion?.top}px`,
                  //   right: `${popupPosion?.right}px`,
                  // }}
                  // changeVisible={handleDeniedAccess}
                  // elementStyles={popupPositionStyles}
                >
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
              </div>
            </OverlayingPopup>
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
      </div>
    </OverlayingPopup>
  );
};
