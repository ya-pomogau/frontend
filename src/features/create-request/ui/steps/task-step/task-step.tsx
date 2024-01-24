import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setDescriptionForTask,
  changeStepDecrement,
  changeStepIncrement,
  setCategory,
} from 'features/create-request/model';
import { Button } from 'shared/ui/button';
import { TextArea } from 'shared/ui/text-area';
import Dropdown, { Option } from '../../../../../shared/ui/dropdown';

import styles from './task-step.module.css';
import { useGetTasksByStatusQuery } from 'services/tasks-api';
import { Tooltip } from 'shared/ui/tooltip';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';

interface ITaskStepProps {
  isMobile?: boolean;
}

export const TaskStep = ({ isMobile }: ITaskStepProps) => {
  const { descriptionForTask, categories, category } = useAppSelector(
    (state) => state.createRequest
  );

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
    dispatch(setDescriptionForTask(e.target.value));
  };

  const handleNextStepClick = () => {
    dispatch(changeStepIncrement());
  };

  const handlePreviousStepClick = () => {
    dispatch(changeStepDecrement());
  };

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
            ></p>
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
        <Button
          buttonType="secondary"
          label="Вернуться"
          onClick={handlePreviousStepClick}
          extClassName={styles.prevButton}
        />
        <Button
          disabled={disabledBtn()}
          buttonType="primary"
          label="Продолжить"
          onClick={handleNextStepClick}
        />
      </div>
    </div>
  );
};
