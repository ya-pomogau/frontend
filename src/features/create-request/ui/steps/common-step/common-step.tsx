import classNames from 'classnames';
import { format, parse } from 'date-fns';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  changeCurrentStep,
  changeStepDecrement,
  closePopup,
  openPopup,
  clearState,
} from 'features/create-request/model';
import {
  Button,
  Icon,
  Typography,
  EditButton,
  CategoriesBackground,
} from 'shared/ui';
import {
  CreateTaskDto,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from 'services/user-task-api';

import styles from './common-step.module.css';

interface ICommonStepProps {
  isMobile?: boolean;
}

export const CommonStep = ({ isMobile }: ICommonStepProps) => {
  const dispatch = useAppDispatch();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
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
  } = useAppSelector((state) => state.createRequest);

  const [isExpanded, setIsExpanded] = useState(false);

  const handlePreviousStepClick = () => {
    dispatch(changeStepDecrement());
  };

  const parseDate = parse(date, 'dd.MM.yyyy', new Date());
  const formattedDate = format(parseDate, 'yyyy.MM.dd');

  const categorySize = category.title.length > 22 ? 'large' : 'medium';

  const handleSubmitClick = () => {
    let requestData = {};

    if (!termlessRequest) {
      const [year, month, day] = formattedDate.split('.');
      const [hours, minutes] = time.split(':');
      const dateObject = new Date(+year, +month - 1, +day, +hours, +minutes);

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
      updateTask({ id: taskId, dto: requestData as CreateTaskDto });
    } else {
      createTask(requestData as CreateTaskDto);
    }
  };

  const handleEditButton = (typeButton: string) => {
    switch (typeButton) {
      case 'date':
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
      <div className={classNames(styles.container)}>
        {isMobile ? (
          <>
            <Typography
              tag={'h2'}
              color={'black'}
              fontFamily={'primaryFont'}
              content={'Дело'}
              extraClass={styles.task}
            />
            <div className={styles.headerWrapper} />
            <div className={styles.dateWrapper}>
              {!termlessRequest ? (
                <>
                  <Typography variant={'paragraph-bold'} content={date} />
                  <Typography
                    variant={'paragraph-bold'}
                    content={time}
                    extraClass={styles.time}
                  />
                </>
              ) : (
                <Typography
                  variant={'paragraph-bold'}
                  content={'Заявка без срока'}
                />
              )}
            </div>
            {isTypeEdit && (
              <EditButton
                extClassName={styles.edit_button}
                label="Изменить дату и время"
                onClick={() => handleEditButton('date')}
              />
            )}
            <div className={styles.addressWrapper}>
              <Icon icon="LocationIcon" color="blue" />
              <Typography variant={'support'} content={address} />
            </div>
            {isTypeEdit && (
              <EditButton
                extClassName={styles.edit_button}
                label="Изменить адрес"
                onClick={() => handleEditButton('coordinates')}
              />
            )}
            <CategoriesBackground
              theme="primary"
              size={categorySize}
              content={category.title}
              extClassName={styles.categories}
            />
            <Typography
              color={'darkGray'}
              extraClass={classNames(styles.descriptionForTask, {
                [styles.expanded]: isExpanded,
              })}
              content={
                <>
                  {description}
                  {isTypeEdit && (
                    <EditButton
                      extClassName={styles.edit_button}
                      label="Изменить задание"
                      onClick={() => handleEditButton('description')}
                    />
                  )}
                </>
              }
            />
            {description.length > 170 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={styles.readMoreButton}
              >
                {isExpanded ? 'Скрыть' : 'Читать'}
              </button>
            )}
          </>
        ) : (
          <>
            <div className={styles.dateWrapper}>
              {!termlessRequest ? (
                <>
                  <Typography variant={'title'} content={date} />
                  <Typography
                    variant={'title'}
                    content={[time, termlessRequest]}
                    extraClass={styles.time}
                  />
                </>
              ) : (
                <Typography variant={'title'} content={'Заявка без срока'} />
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
              <Icon icon="LocationIcon" color="blue" />
              <Typography content={address} />
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
              size={categorySize}
              content={category.title}
              extClassName={styles.categories}
            />
            <Typography
              color={'darkGray'}
              extraClass={classNames(styles.descriptionForTask, {
                [styles.expanded]: isExpanded,
              })}
              content={
                <>
                  {description}
                  {isTypeEdit && (
                    <EditButton
                      extClassName={styles.edit_button}
                      label="Изменить задание"
                      onClick={() => handleEditButton('description')}
                    />
                  )}
                </>
              }
            />
            {description.length > 160 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={styles.readMoreButton}
              >
                {isExpanded ? 'Скрыть' : 'Читать'}
              </button>
            )}
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
