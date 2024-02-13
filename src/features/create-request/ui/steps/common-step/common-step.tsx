import classNames from 'classnames';
import { format, parse } from 'date-fns';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setDate,
  changeCurrentStep,
  changeStepDecrement,
  closePopup,
  openPopup,
  clearState,
} from 'features/create-request/model';
import { Button } from 'shared/ui/button';
import { LocationIcon } from 'shared/ui/icons/location-icon';
import { CategoriesBackground } from 'shared/ui/categories-background';

import styles from './common-step.module.css';
import { EditButton } from 'shared/ui/edit-button';
interface ICommonStepProps {
  isMobile?: boolean;
}

export const CommonStep = ({ isMobile }: ICommonStepProps) => {
  const dispatch = useAppDispatch();
  const {
    taskId,
    time,
    address,
    category,
    description,
    date,
    isTypeEdit,
    termlessRequest,
    location,
    temporaryCategory,
  } = useAppSelector((state) => state.createRequest);

  const handlePreviousStepClick = () => {
    dispatch(changeStepDecrement());
  };

  //if(data === null){
  //  termlessRequest = true;
  //}
  const parseDate = parse(date, 'dd.MM.yyyy', new Date());
  const formattedDate = format(parseDate, 'yyyy.MM.dd');

  const handleSubmitClick = () => {
    let requestData = {};
    if (!termlessRequest) {
      const [year, month, day] = formattedDate.split('.');
      const [hours, minutes] = time.split(':');
      const dateObject = new Date(
        +year,
        +month - 1,
        +day,
        +hours,
        +minutes
      ).toISOString();

      requestData = {
        categoryId: category._id,
        location,
        date: dateObject,
        address,
        description,
      };
      dispatch(clearState());
      dispatch(closePopup());
    } else {
      requestData = {
        categoryId: category._id,
        location,
        date: null,
        address,
        description,
      };

      dispatch(clearState());
      dispatch(closePopup());
    }
    if (isTypeEdit) {
      const updateTask = { ...requestData, taskId: taskId };
      console.log('это редактирование', updateTask);
    } else {
      console.log('это новая таска', requestData);
    }
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
              content={category.title}
              extClassName={styles.categories}
            />
            <p
              className={classNames(
                'text_size_medium',
                'm-0',
                styles.descriptionForTask
              )}
            >
              {description}
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
              {!termlessRequest ? (
                <>
                  <p className={classNames('text_size_large', 'm-0')}>{date}</p>
                  <p className={classNames('text_size_large', styles.time)}>
                    {time}
                    {termlessRequest}
                  </p>
                </>
              ) : (
                <p className={classNames('text_size_large', 'm-0')}>
                  Заявка без срока
                </p>
              )}
              {isTypeEdit ? (
                <EditButton
                  extClassName={styles.edit_button}
                  label="Изменить дату и время"
                  onClick={() => handleEditButton('date')}
                />
              ) : null}
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
              content={category.title}
              extClassName={styles.categories}
            />
            <p
              className={classNames(
                'text_size_medium',
                styles.descriptionForTask
              )}
            >
              {description}
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
