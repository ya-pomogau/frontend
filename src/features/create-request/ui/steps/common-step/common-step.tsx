import classNames from 'classnames';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setDate,
  setTime,
  changeCurrentStep,
  changeStepDecrement,
  closePopup,
  openPopup,
} from 'features/create-request/model';
import { Button } from 'shared/ui/button';
import { LocationIcon } from 'shared/ui/icons/location-icon';
import { CategoriesBackground } from 'shared/ui/categories-background';

import styles from './common-step.module.css';
import { EditButton } from 'shared/ui/edit-button';

interface ICommonStepProps {
  isMobile?: boolean;
  typeWin?: string;
}

export const CommonStep = ({
  isMobile,
  typeWin = 'string',
}: ICommonStepProps) => {
  const dispatch = useAppDispatch();
  const { time, address, category, descriptionForTask, date, isTypeEdit } =
    useAppSelector((state) => state.createRequest);

  const handlePreviousStepClick = () => {
    dispatch(changeStepDecrement());
  };

  const handleSubmitClick = () => {
    console.log(date);

    dispatch(closePopup());
  };

  const handleEditButton = (typeButton: string) => {
    switch (typeButton) {
      case 'date':
        dispatch(setDate(format(new Date(), 'dd.MM.yyyy')));
        dispatch(changeCurrentStep(1));
        dispatch(openPopup());
        break;

      case 'coordinates':
        dispatch(changeCurrentStep(2));
        dispatch(openPopup());
        break;

      case 'description':
        dispatch(changeCurrentStep(3));
        dispatch(openPopup());
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <div
        className={classNames('text', 'text_type_regular', styles.container)}
      >
        {isMobile ? (
          <>
            <p
              className={classNames(
                'text',
                'text_type_regular ',
                'm-0',
                styles.task
              )}
            >
              Дело
            </p>
            <div className={styles.headerWrapper} />
            <div
              className={classNames(
                'text',
                'text_type_bold',
                styles.dateWrapper
              )}
            >
              <p className={classNames('text_size_medium', 'm-0')}>{date}</p>
              <p className={classNames('text_size_medium', styles.time)}>
                {time}
              </p>
            </div>
            <div className={styles.addressWrapper}>
              <LocationIcon color="blue" />
              <p className={classNames('m-0', 'text_size_medium')}>{address}</p>
            </div>
            <CategoriesBackground
              theme="primary"
              size="medium"
              content={category.label}
              extClassName={styles.categories}
            />
            <p
              className={classNames(
                'text_size_medium',
                'text_type_bold ',
                styles.typeOfTask
              )}
            >
              13
            </p>
            <p
              className={classNames(
                'text_size_medium',
                'm-0',
                styles.descriptionForTask
              )}
            >
              {descriptionForTask}
            </p>
          </>
        ) : (
          <>
            <div
              className={classNames(
                'text',
                'text_type_regular',
                'm-0',
                styles.dateWrapper
              )}
            >
              <p className={classNames('text_size_large', 'm-0')}>{date}</p>
              {isTypeEdit ? (
                <EditButton
                  extClassName={styles.edit_button}
                  label="Изменить дату и время"
                  onClick={() => handleEditButton('date')}
                />
              ) : null}
              <p className={classNames('text_size_large', styles.time)}>
                {time}
              </p>
            </div>
            <div className={styles.addressWrapper}>
              <LocationIcon color="blue" />
              <p className={classNames('m-0', 'text_size_medium')}>{address}</p>
              {isTypeEdit && (
                <EditButton
                  extClassName={styles.edit_button}
                  label="Изменить адрес"
                  onClick={() => handleEditButton('coordinates')}
                />
              )}
            </div>
            <CategoriesBackground
              theme="primary"
              size="medium"
              content={category.label}
              extClassName={styles.categories}
            />
            <p
              className={classNames(
                'text_size_medium',
                'text_type_bold ',
                styles.typeOfTask
              )}
            >
              123
            </p>
            <p
              className={classNames(
                'text_size_medium',
                styles.descriptionForTask
              )}
            >
              {descriptionForTask}
              {isTypeEdit ? (
                <EditButton
                  extClassName={styles.edit_button}
                  label="Изменить задание"
                  onClick={() => handleEditButton('description')}
                />
              ) : null}
            </p>
          </>
        )}
      </div>
      <div className={styles.buttonsWrapper}>
        {!isTypeEdit && (
          <Button
            buttonType="secondary"
            label="Вернуться"
            onClick={handlePreviousStepClick}
            extClassName={styles.prevButton}
          />
        )}
        <Button
          buttonType="primary"
          label="Опубликовать"
          onClick={handleSubmitClick}
        />
      </div>
    </div>
  );
};
