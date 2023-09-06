import React from 'react';
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
            <TextArea
              value={descriptionForTask}
              label="Опишите задачу"
              name="task"
              placeholder="Например: Помогите выгулять собаку."
              onChange={handleTaskDescValueChange}
              extClassName={styles.textarea}
            />
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
          label="Продолжить"
          onClick={handleNextStepClick}
        />
      </div>
    </div>
  );
};
