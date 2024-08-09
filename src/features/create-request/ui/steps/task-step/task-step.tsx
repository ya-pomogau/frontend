import { useEffect } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setDescriptionForTask,
  setCategory,
  setCategoryList,
} from 'features/create-request/model';
import { Button } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import Dropdown, { Option } from '../../../../../shared/ui/dropdown';

import styles from './task-step.module.css';
import usePropsButtonCustom from '../useButtonPropsCustom';
import { useGetCategoriesQuery } from 'services/categories-api';

interface ITaskStepProps {
  isMobile?: boolean;
}

export const TaskStep = ({ isMobile }: ITaskStepProps) => {
  const { data } = useGetCategoriesQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCategoryList(data));
    }
  }, [data, dispatch]);

  const { description, categories, category, isTypeEdit } = useAppSelector(
    (state) => state.createRequest
  );

  const optionsForSelect = categories?.map((item) => ({
    _id: item._id,
    title: item.title,
  }));

  const handleTaskValueChange = (item: Option) => {
    dispatch(setCategory(item));
  };

  const handleTaskDescValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setDescriptionForTask(e.target.value));
  };

  const propsButton = usePropsButtonCustom();

  const disabledBtn = () => {
    if (description.length <= 5 || description.length > 300) {
      return true;
    }
    if (category._id === '' && category.title === '') {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.taskContainer}>
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
            <Dropdown
              selected={category}
              label="Выберите тип задачи"
              placeholder="Выберите тип задачи"
              onChange={handleTaskValueChange}
              items={optionsForSelect}
              extClassName={styles.select}
            />
            {category._id === '' && category.title === '' && (
              <p className={styles.messageAlert}>Выберите тип задачи</p>
            )}
            <TextArea
              value={description}
              label="Опишите задачу"
              name="task"
              placeholder="Например: Помогите выгулять собаку."
              onChange={handleTaskDescValueChange}
              extClassName={styles.textarea}
              maxLength={300}
            />
            {description.length <= 5 && (
              <p className={styles.messageAlert}>Добавьте описание задачи</p>
            )}
          </>
        ) : (
          <>
            <Dropdown
              selected={category}
              label="Выберите тип задачи"
              placeholder="Выберите тип задачи"
              onChange={handleTaskValueChange}
              items={optionsForSelect}
              extClassName={styles.select}
            />
            {category._id === '' && category.title === '' && (
              <p className={styles.messageAlert}>Выберите тип задачи</p>
            )}
            <TextArea
              value={description}
              label="Опишите задачу"
              name="task"
              placeholder="Например: Помогите выгулять собаку."
              onChange={handleTaskDescValueChange}
              extClassName={styles.textarea}
              maxLength={300}
            />
            {description.length <= 5 && (
              <p className={styles.messageAlert}>Добавьте описание задачи</p>
            )}
          </>
        )}
      </div>
      <div className={styles.buttonsWrapper}>
        <div className={styles.alertWrapper}></div>
        {!isTypeEdit && (
          <Button
            buttonType="secondary"
            label={propsButton.backlabel}
            onClick={propsButton.backonClick}
            extClassName={styles.prevButton}
          />
        )}
        <Button
          disabled={disabledBtn()}
          buttonType="primary"
          label={propsButton.label}
          onClick={propsButton.onClick}
        />
      </div>
    </div>
  );
};

