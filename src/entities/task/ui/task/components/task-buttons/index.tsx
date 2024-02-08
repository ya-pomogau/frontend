import { TaskButtonType, UserRole } from 'shared/types/common.types';
import { SquareButton } from 'shared/ui/square-buttons';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ModalContent } from 'widgets/task-buttons-content';
import styles from './styles.module.css';
import { isAfter, parseISO } from 'date-fns';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  changeCurrentStep,
  openPopup,
  setAddress,
  setCategory,
  setDate,
  setDescriptionForTask,
} from 'features/create-request/model';
import { Category } from 'entities/task/types';

interface TaskButtonsProps {
  recipientName?: string;
  address: string;
  description: string;
  category: Category;
  date: string | null;
  completed: boolean;
  conflict: boolean;
  extClassName?: string;
}

export const TaskButtons = ({
  recipientName,
  address,
  description,
  category,
  date,
  completed,
  conflict,
  extClassName,
}: TaskButtonsProps) => {
  const parsedDate = parseISO(date!);
  const comparedDateResult = isAfter(new Date(), parsedDate);
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.user.role);
  const additinalAddress = address;
  //Это значение раньше было в пропсах и никакого отношения к отображению кнопок не имеет
  //TODO заменить на актуальное условие показа кнопок
  const isStatusActive = true;

  const handleEditButton = () => {
    dispatch(setDate(date));
    dispatch(setAddress({ additinalAddress }));
    dispatch(setDescriptionForTask(description));
    dispatch(setCategory({ value: category._id, label: category.title }));
    dispatch(changeCurrentStep(4));
    dispatch(openPopup());
  };
  //TODO: логика отображения, работы кнопок должна соответствовать миро доске
  //TODO: в зависимости от роли, на некоторых попапах будет разных текст
  return (
    <div className={classNames(extClassName, styles.buttons_action)}>
      <ButtonWithModal
        modalContent={
          <ModalContent
            type={TaskButtonType.confirm}
            active={isStatusActive}
            date={date}
          />
        }
      >
        <SquareButton
          buttonType={TaskButtonType.confirm}
          //переписать completed если бэк поменяется
          extClassName={
            recipientName && !date && completed
              ? ''
              : recipientName
              ? ''
              : styles.item_hidden
          }
        />
      </ButtonWithModal>
      <ButtonWithModal
        modalContent={<ModalContent type={TaskButtonType.close} date={date}/>}
      >
        <SquareButton
          buttonType={TaskButtonType.close}
          extClassName={
            (!date && recipientName) || !isStatusActive
              ? styles.item_hidden
              : styles.button_edit
          }
          //переписать completed если бэк поменяется
          disabled={comparedDateResult || !completed}
        />
      </ButtonWithModal>
      <ButtonWithModal
        modalContent={
          <ModalContent
            type={TaskButtonType.conflict}
            active={isStatusActive}
            conflict={conflict}
            date={date}
          />
        }
      >
        <SquareButton
          buttonType={TaskButtonType.conflict}
          //переписать conflict на подходящий параметр
          extClassName={
            recipientName && !date && !conflict
              ? ''
              : recipientName
              ? ''
              : !comparedDateResult
              ? ''
              : styles.item_hidden
          }
        />
      </ButtonWithModal>
      {userRole === UserRole.RECIPIENT && (
        <SquareButton
          onClick={handleEditButton}
          buttonType="edit"
          extClassName={
            // не забыть удалить !
            !recipientName ? styles.item_hidden : styles.button_edit
          }
        />
      )}
    </div>
  );
};
