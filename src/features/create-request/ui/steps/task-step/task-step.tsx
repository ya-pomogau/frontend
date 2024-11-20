import { useEffect } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';

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
import useFormField from '../../../../../shared/hooks/use-form-field';

interface ITaskStepProps {
  isMobile?: boolean;
}

interface FormValues {
  task: string;
  category: Option | undefined;
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

  const propsButton = usePropsButtonCustom();

  const isTitleUndefined = category._id === '' && category.title === '';

  const {
    control,
    handleSubmit: onSubmit,
    formState: { isValid },
    trigger,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      category: isTitleUndefined ? undefined : category,
      task: description,
    },
  });

  const categoryField = useFormField('category', control, {
    required: 'Обязательное поле',
  });

  const taskDescField = useFormField('task', control, {
    required: 'Обязательное поле',
    minLength: {
      value: 5,
      message: 'Минимальная длина - 5 символов',
    },
  });

  const handleSubmitForm: SubmitHandler<FormValues> = (values) => {
    console.log(values);
    dispatch(setCategory(values.category));
    dispatch(setDescriptionForTask(values.task));
    propsButton.onClick();
  };

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <div className={styles.mainWrapper}>
      {isMobile ? (
        <>
          <p className={classNames('text', 'text_type_regular ', styles.task)}>
            Дело
          </p>
          <div className={styles.headerWrapper} />
        </>
      ) : null}
      <div className={styles.taskContainer}>
        <form onSubmit={onSubmit(handleSubmitForm)} className={styles.form}>
          <Dropdown
            label="Выберите тип задачи"
            placeholder="Выберите тип задачи"
            onChange={categoryField.onChange}
            selected={categoryField.value}
            error={categoryField.error}
            items={optionsForSelect}
          />

          <TextArea
            name="task"
            label="Опишите задачу"
            placeholder="Например: Помогите выгулять собаку."
            maxLength={300}
            extClassName={styles.textarea}
            onChange={taskDescField.onChange}
            value={taskDescField.value}
            error={taskDescField.error}
          />

          <div className={styles.buttonsWrapper}>
            {!isTypeEdit && (
              <Button
                buttonType="secondary"
                label={propsButton.backlabel}
                onClick={propsButton.backonClick}
                extClassName={styles.prevButton}
              />
            )}
            <Button
              disabled={!isValid}
              buttonType="primary"
              label={propsButton.label}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
