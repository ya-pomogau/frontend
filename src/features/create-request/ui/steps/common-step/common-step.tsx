import classNames from 'classnames';
import { format, parse } from 'date-fns';
import { useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useTruncatedText } from 'shared/hooks';
import {
  changeCurrentStep,
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
  GradientDivider,
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

  const textRef = useRef<HTMLParagraphElement>(null);
  const { isTruncated, isExpanded, toggleIsShowingMore } =
    useTruncatedText(textRef);

  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  const parseDate = parse(date, 'dd.MM.yyyy', new Date());
  const formattedDate = format(parseDate, 'yyyy.MM.dd');

  const categorySize = category.title.length > 15 ? 'large' : 'medium';

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
      {isMobile && (
        <>
          <Typography
            tag={'h2'}
            variant={'title'}
            extraClass={styles.title__mobile}
          >
            Дело
            <GradientDivider extClassName={styles.gradient} />
          </Typography>
        </>
      )}

      <div className={styles.content}>
        <div className={styles.content__item_wrapper}>
          <Typography
            variant={isMobile ? 'paragraph-bold' : 'subtitle'}
            extraClass={styles.dateAndTime}
          >
            {!termlessRequest ? (
              <>
                <span>{date}</span>
                <span>{time}</span>
              </>
            ) : (
              'Заявка без срока'
            )}
          </Typography>
          {isTypeEdit && (
            <EditButton
              label="Изменить дату и время"
              onClick={() => handleEditButton('date')}
            />
          )}
        </div>

        <div className={styles.content__item_wrapper}>
          <div className={styles.addressOutput}>
            <Icon icon="LocationIcon" color="blue" />
            <Typography variant={'paragraphResize'} content={address} />
          </div>
          {isTypeEdit && (
            <EditButton
              label="Изменить адрес"
              onClick={() => handleEditButton('coordinates')}
            />
          )}
        </div>

        <div className={styles.content__item_description}>
          <CategoriesBackground
            theme="primary"
            size={categorySize}
            content={category.title}
            extClassName={styles.category}
          />
          <Typography
            color={'darkGray'}
            extraClass={classNames(styles.descriptionForTask, {
              [styles.expanded]: isExpanded,
            })}
            ref={textRef}
            content={description}
          />
          {isTruncated && (
            <button
              onClick={toggleIsShowingMore}
              className={styles.readMoreButton}
            >
              {isExpanded ? 'Скрыть' : 'Читать'}
            </button>
          )}
          {isTypeEdit && (
            <EditButton
              label="Изменить задание"
              onClick={() => handleEditButton('description')}
              extClassName={styles.editButton}
            />
          )}
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          buttonType="secondary"
          label="Вернуться"
          onClick={handleClosePopup}
        />
        <Button
          buttonType="primary"
          label="Опубликовать"
          onClick={handleSubmitClick}
        />
      </div>
    </div>
  );
};
