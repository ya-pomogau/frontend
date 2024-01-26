import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  changeStepDecrement,
  clearState,
  closePopup,
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
  const { time, address, category, descriptionForTask, date, termlessRequest } =
    useAppSelector((state) => state.createRequest);

  const handlePreviousStepClick = () => {
    dispatch(changeStepDecrement());
  };

  const handleSubmitClick = () => {
    const [day, month, year] = date.split('.');
    const [hours, minutes] = time.split(':');

    const dateObject = new Date(+year, +month - 1, +day, +hours, +minutes);

    console.log(dateObject);
    const requestData = {
      time,
      date: termlessRequest ? null : dateObject,
      address,
      category,
      descriptionForTask,
    };
    console.log(requestData);
    dispatch(clearState());
    dispatch(closePopup());
  };

  const handleEditButton = (typeButton: string) => {
    switch (typeButton) {
      case 'date':
        console.log('date');

        break;

      case 'coordinates':
        console.log('coordinates');
        break;

      case 'description':
        console.log('description');
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
              {typeWin && (
                <EditButton
                  extClassName={styles.edit_button}
                  label="Изменить дату и время"
                  onClick={() => handleEditButton('date')}
                />
              )}
              <p className={classNames('text_size_large', styles.time)}>
                {time}
              </p>
            </div>
            <div className={styles.addressWrapper}>
              <LocationIcon color="blue" />
              <p className={classNames('m-0', 'text_size_medium')}>{address}</p>
              {typeWin && (
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
                styles.descriptionForTask
              )}
            >
              {descriptionForTask}
              {typeWin && (
                <EditButton
                  extClassName={styles.edit_button}
                  label="Изменить задание"
                  onClick={() => handleEditButton('description')}
                />
              )}
            </p>
          </>
        )}
      </div>
      <div className={styles.buttonsWrapper}>
        {!typeWin && (
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
