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
import { CurrentPage } from '../../types';

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
  // const { data: categories } = useGetCategoriesQuery('');
  const categories = [
    {
      _id: '65ce10451f54b2c0027072e7',
      title: 'Сопровождение',
      points: 1,
      accessLevel: 1,
    },
    {
      _id: '65ce10571f54b2c0027072e8',
      title: 'Покупка вещей',
      points: 1,
      accessLevel: 2,
    },
    {
      _id: '65d1dbec3a9fae1fc97c0154',
      title: 'Покупка вещей/техники',
      points: 1,
      accessLevel: 3,
    },
    {
      _id: '65d1dc5b3a9fae1fc97c0155',
      title: 'Помощь в уборке',
      points: 1,
      accessLevel: 1,
    },
    {
      _id: '65d1dc8a3a9fae1fc97c0156',
      title: 'Ремонт техники/жилья',
      points: 1,
      accessLevel: 3,
    },
    {
      _id: '65d1dcad3a9fae1fc97c0157',
      title: 'Перевозка в личном транспорте',
      points: 1,
      accessLevel: 3,
    },
    {
      _id: '65d1dcd73a9fae1fc97c0158',
      title: 'Помощь в подъёме/спуске',
      points: 1,
      accessLevel: 1,
    },
    {
      _id: '65d1dcf93a9fae1fc97c0159',
      title: 'Помощь в готовке',
      points: 1,
      accessLevel: 3,
    },
    {
      _id: '65d1dd1d3a9fae1fc97c015a',
      title: 'Организация досуга',
      points: 1,
      accessLevel: 1,
    },
  ];

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
    dispatch(setCategoryList(categories));

    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return null;

  return (
    <OverlayingPopup
      isOpened={isPopupOpen}
      onClose={isOpen ? undefined : handleCloseClick}
    >
      <div>
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
            <OverlayingPopup
              extClassName={styles.tooltipWrapper}
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
                    width: 343,
                    padding: 0,
                  }}
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
