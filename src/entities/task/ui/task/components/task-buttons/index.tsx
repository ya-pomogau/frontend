import { TaskButtonType } from 'shared/types/common.types';
import { SquareButton } from 'shared/ui/square-buttons';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ModalContent } from 'widgets/task-buttons-content';
import styles from './styles.module.css';
import { isAfter, parseISO } from 'date-fns';
import classNames from 'classnames';
import { useAppDispatch } from 'app/hooks';
import { changeCurrentStep, openPopup, setAddress, setCategory, setDate, setDescriptionForTask } from 'features/create-request/model';

interface TaskButtonsProps {
  recipientName?: string;
  address: string;
  description: string,
  category: {
    id: string,
    name: string,
    scope: number,
  }
  date?: string;
  isStatusActive: boolean;
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
  isStatusActive = true,
  completed,
  conflict,
  extClassName,
}: TaskButtonsProps) => {
  const parsedDate = parseISO(date!);
  const comparedDateResult = isAfter(new Date(), parsedDate);
  const dispatch = useAppDispatch();

  const additinalAddress = address;

  const handleEditButton = () => {
    dispatch(setDate(date));
    dispatch(setAddress({ additinalAddress }));
    dispatch(setDescriptionForTask(description));
    dispatch(setCategory({ value: category.id, label: category.name }));
    dispatch(changeCurrentStep(4));
    dispatch(openPopup());
  };
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
        modalContent={<ModalContent type={TaskButtonType.close} />}
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
      <SquareButton
        onClick={handleEditButton}
        buttonType="edit"
        extClassName={
          // не забыть удалить !
          !recipientName ? styles.item_hidden : styles.button_edit
        }
      />
    </div>
  );
};
