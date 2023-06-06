import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import {
  addDescriptionForTask,
  addTypeOfTask,
  changeStepDecrement,
  changeStepIncrement,
} from "features/create-request/model";
import React from "react";
import { Button } from "shared/ui/button";
import { Select } from "shared/ui/select";
import { TextArea } from "shared/ui/text-area";
import styles from "./task-step.module.css";

interface ITaskStepProps {
  tasks: Array<{ value: string; label: string }>;
}

export const TaskStep = ({ tasks }: ITaskStepProps) => {
  const { descriptionForTask, typeOfTask } = useAppSelector(
    (state: RootState) => state.createRequest
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
    <>
      <div className={styles.taskContainer}>
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
    </>
  );
};
