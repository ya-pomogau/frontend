import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { closePopup, setCategoryList } from 'features/create-request/model';
import { MainPopup } from 'shared/ui/main-popup';
import { OverlayingPopup } from 'shared/ui/overlaying-popup';
import { CurrentPage } from '../../types';

import { AddressStep } from './address-step/address-step';
import { CommonStep } from './common-step/common-step';
import { DateStep } from './date-step/date-step';
import { TaskStep } from './task-step/task-step';
import { useGetCategoriesQuery } from 'services/categories-api';

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

  const handleCloseClick = () => {
    dispatch(closePopup());
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
        handleCloseClick={handleCloseClick}
        isMobile={isMobile}
      >
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
