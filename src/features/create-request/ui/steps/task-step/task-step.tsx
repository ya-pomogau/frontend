import React from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setDescriptionForTask,
  setCategory,
} from 'features/create-request/model';
import { Button } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import Dropdown, { Option } from '../../../../../shared/ui/dropdown';

import styles from './task-step.module.css';
import usePropsButtonCustom from '../useButtonPropsCustom';
import { useGetTasksByStatusQuery } from 'services/tasks-api';

interface ITaskStepProps {
  isMobile?: boolean;
}

export const TaskStep = ({ isMobile }: ITaskStepProps) => {
  const { descriptionForTask, categories, category, isTypeEdit } = useAppSelector(
    (state) => state.createRequest
  );
  const userId = useAppSelector((state) => state.user.data?.id);
  const { data: tasks } = useGetTasksByStatusQuery('active');
  // console.log(tasks);
  // Фильтруем заявки по id
  const taskId = tasks.filter((item: any) => {
    if (item.recipient.id === userId) {
      return item;
    }
  });
  // Получаем id категории
  const categoryId = taskId.map((item: any) => item.category.id);
  //Получем объект уже выбранной категории
  const commonIds = categories.filter((obj) => categoryId.includes(obj.id));

  // console.log(taskId);
  console.log(categoryId);
  console.log(commonIds);
  const dispatch = useAppDispatch();

  const optionsForSelect = categories?.map((item) => ({
    value: String(item.id),
    label: item.name,
  }));

  const handleTaskValueChange = (item: Option) => {
    dispatch(setCategory(item));
  };

  const handleTaskDescValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log(222);

    dispatch(setDescriptionForTask(e.target.value));
  };

  const propsButton = usePropsButtonCustom();

  const disabledBtn = () => {
    if (descriptionForTask.length <= 5 || descriptionForTask.length > 300) {
      return true;
    }
    if (category.value === '' && category.label === '') {
      return true;
    }
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

            <TextArea
              value={descriptionForTask}
              label="Опишите задачу"
              name="task"
              placeholder="Например: Помогите выгулять собаку."
              onChange={handleTaskDescValueChange}
              extClassName={styles.textarea}
              maxLength={300}
            />
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
            {category.value === '' && category.label === '' && (
              <p className={styles.messageAlert}>Выберите тип задачи</p>
            )}
            <TextArea
              value={descriptionForTask}
              label="Опишите задачу"
              name="task"
              placeholder="Например: Помогите выгулять собаку."
              onChange={handleTaskDescValueChange}
              extClassName={styles.textarea}
              maxLength={300}
            />
          </>
        )}
      </div>
      <div className={styles.buttonsWrapper}>
        <div className={styles.alertWrapper}>
          {descriptionForTask.length <= 5 && (
            <p className={styles.messageAlert}>Добавьте описание задачи</p>
          )}
        </div>
        {category.value === '' && category.label === '' && (
            <p className={styles.messageAlert}>Выберите тип задачи</p>
        )}
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
