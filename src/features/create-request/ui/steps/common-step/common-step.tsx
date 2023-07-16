import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { changeStepDecrement, closePopup } from 'features/create-request/model';
import { Button } from 'shared/ui/button';
import { LocationIcon } from 'shared/ui/icons/location-icon';
import { CategoriesBackground } from 'shared/ui/categories-background';

import styles from './common-step.module.css';

interface ICommonStepProps {
  isMobile?: boolean;
}

export const CommonStep = ({ isMobile }: ICommonStepProps) => {
  const dispatch = useAppDispatch();
  const { time, address, category, descriptionForTask, date } = useAppSelector(
    (state) => state.createRequest
  );

  const handlePreviousStepClick = () => {
    dispatch(changeStepDecrement());
  };

  const handleSubmitClick = () => {
    dispatch(closePopup());
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
              <p className={classNames('text_size_large', styles.time)}>
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
              123
            </p>
            <p
              className={classNames(
                'text_size_medium',
                styles.descriptionForTask
              )}
            >
              {descriptionForTask}
            </p>
          </>
        )}
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          buttonType="secondary"
          label="Вернуться"
          onClick={handlePreviousStepClick}
          extClassName={styles.prevButton}
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
