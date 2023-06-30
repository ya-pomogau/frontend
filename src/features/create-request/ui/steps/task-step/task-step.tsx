import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import classNames from "classnames";
import {
  addDescriptionForTask,
  addTypeOfTask,
  changeStepDecrement,
  changeStepIncrement,
} from "features/create-request/model";
import { Button } from "shared/ui/button";
import { Select } from "shared/ui/select";
import { TextArea } from "shared/ui/text-area";
import styles from "./task-step.module.css";

interface ITaskStepProps {
  tasks: Array<{ value: string; label: string }>;
  isMobile?: boolean;
}

export const TaskStep = ({ tasks, isMobile }: ITaskStepProps) => {
  const { descriptionForTask, typeOfTask } = useAppSelector(
    (state) => state.createRequest
  );

  const dispatch = useAppDispatch();

  const handleTaskValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(addTypeOfTask(e.target.value));
  };

  const handleTaskDescValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(addDescriptionForTask(e.target.value));
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
                "text",
                "text_size_small",
                "text_type_regular ",
                "m-0",
                styles.task
              )}
            >
              Дело
            </p>
            <div className={styles.headerWrapper} />
            <Select
              selectedValue={typeOfTask}
              label="Выберите тип задачи"
              placeholder="Выберите тип задачи"
              name="tasks"
              onChange={handleTaskValueChange}
              options={tasks}
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
            <Select
              selectedValue={typeOfTask}
              label="Выберите тип задачи"
              placeholder="Выберите тип задачи"
              name="tasks"
              onChange={handleTaskValueChange}
              options={tasks}
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
