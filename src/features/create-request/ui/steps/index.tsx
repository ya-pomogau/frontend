import { useEffect, useState } from 'react';

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

  const handleCloseClick = () => {
    dispatch(closePopup());
    dispatch(clearState());
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
    <OverlayingPopup
      isOpened={isPopupOpen}
      onClose={isOpen ? undefined : handleCloseClick}
    >
      <div>
        <MainPopup
          name={data.fullname}
          avatarLink={data.avatar}
          avatarName={data.fullname}
          phoneNumber={data.phone}
          handleCloseClick={() => setIsOpen(true)}
          isMobile={isMobile}
          extClassName={isMobile ? styles.mainPopUpWrapperMobile : undefined}
        >
          {isOpen && (
            <OverlayingPopup
              isOpened={isOpen}
              onClose={isOpen ? () => setIsOpen(false) : undefined}
            >
              <div>
                <Tooltip
                  visible
                  extClassName={isMobile ? styles.modalMobile : styles.modal}
                  pointerPosition="right"
                  elementStyles={{
                    zIndex: 11,
                  }}
                >
                  <div className={styles.text}>
                    Закрыть окно сейчас и удалить ранее внесенную информацию?
                  </div>
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
