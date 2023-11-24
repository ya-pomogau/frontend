import classNames from 'classnames';

import { Informer } from '../informer';
import { Button } from '../button';

import styles from './styles.module.css';
import { Tooltip } from '../tooltip';
import { CloseCrossIcon } from '../icons/close-cross-icon';
import Checkbox from '../checkbox';
import { CancelationReasonIds } from './consts';
import { SquareButton } from '../square-buttons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ConflictIcon } from '../icons/conflict-icon';
import '../../../app/assets/styles/common.css';

interface DialogProps {
  title?: string;
  text?: string;
  isContent?: boolean;
  isGroupButton?: boolean;
  isTaskStarted?: boolean;
  isTaskClose?: boolean;
  isTaskResponse?: boolean;
  isTaskResponseIcon?: boolean;
  isTaskCancelation?: boolean;
  isTaskCancelationReason?: boolean;
  isTaskClosingBeforePublicationRecipient?: boolean;
  isTaskClosingBeforePublicationMaster?: boolean;
  isTaskConfirmDeletion?: boolean;
  isDeletePublication?: boolean;
  isTaskOnMap?: boolean;
  isChangePassword?: boolean;
  isExitButton?: boolean;
  isTaskUndone?: boolean;
  isTaskTaken?: boolean;
  isAlertDialog?: boolean;
  isConfirmDialog?: boolean;
  // handleCloseDialog?: any;
  buttonRef?: React.RefObject<HTMLElement>;
  tasksRef?: React.RefObject<HTMLElement>;
  isMobile?: boolean;
  changeVisible: () => void;
  extClassName?: string;
}

export const Dialog = ({
  title,
  text,
  isContent,
  isGroupButton,
  isTaskStarted,
  isTaskClose,
  isTaskResponse,
  isTaskResponseIcon,
  isTaskCancelation,
  isTaskCancelationReason,
  isTaskClosingBeforePublicationRecipient,
  isTaskClosingBeforePublicationMaster,
  isTaskConfirmDeletion,
  isDeletePublication,
  isTaskOnMap,
  isChangePassword,
  isExitButton = false,
  isTaskUndone,
  isTaskTaken,
  // handleCloseDialog,
  buttonRef,
  tasksRef,
  isMobile,
  changeVisible,
  extClassName,
}: DialogProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // const [dialogPosition, setDialogPosition] = useState({
  //   top: `${0}px`,
  //   right: `${0}px`,
  // });

  const [dialogPosition, setDialogPosition] = useState({
    top: 0,
    right: 0,
  });

  const calculateDialogPosition = useCallback(() => {
    const buttonRect = buttonRef?.current?.getBoundingClientRect();

    if (buttonRect) {
      setDialogPosition({
        // top: `${buttonRect?.bottom}px`,
        // right: `${window.innerWidth - buttonRect?.right - 10}px`,
        // top: buttonRect?.bottom,
        // right: window.innerWidth - buttonRect?.right - 10,
        top: buttonRect.bottom,
        right: buttonRect.right,
      });
    }
    console.log(
      'dialogPosition',
      buttonRect?.bottom,
      buttonRect?.right,
      buttonRef
    );
  }, []);

  useEffect(() => {
    calculateDialogPosition();
    window.addEventListener('resize', calculateDialogPosition);
    // window.addEventListener('scroll', calculateDialogPosition);
    // if (tasksRef?.current) {
    //   tasksRef.current.addEventListener('scroll', calculateDialogPosition);
    // }
    // console.log(dialogPosition);

    return () => {
      window.removeEventListener('resize', calculateDialogPosition);
      // window.removeEventListener('scroll', calculateDialogPosition);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown);
    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, []);

  const handleEscKeydown = (e: { key: string }) => {
    e.key === 'Escape' && changeVisible();
  };

  return (
    <Tooltip
      pointerPosition={
        isTaskClosingBeforePublicationRecipient ||
        isTaskClosingBeforePublicationMaster ||
        isTaskOnMap ||
        isTaskTaken
          ? 'center'
          : isChangePassword || isTaskClose
          ? 'null'
          : 'right'
      }
      elementStyles={dialogPosition}
      extClassName={classNames(
        styles.tooltip,
        `${isMobile ? styles.tooltipMobile : styles.tooltip}`,
        `${(isChangePassword || isTaskClose) && styles.tooltipSmall}`
      )}
      changeVisible={changeVisible}
      visible
    >
      <div
        ref={modalRef}
        className={classNames(
          styles.container,
          `${(isChangePassword || isTaskClose) && styles.containerSmall}`,
          extClassName
        )}
      >
        {isExitButton && (
          <div className={styles.exitButtonWrapper}>
            <CloseCrossIcon
              className={styles.closeIcon}
              size="14"
              color="blue"
              onClick={changeVisible}
            />
          </div>
        )}

        {title && !isTaskTaken && (
          <>
            <p
              className={classNames(
                'text',
                'text_size_medium',
                'text_type_bold ',
                styles.headerText
              )}
            >
              {title}
            </p>
            <hr className={styles.titleLine} />
          </>
        )}

        {title && isTaskTaken && (
          <>
            <div className={styles.titleContainer}>
              <ConflictIcon size="24" color="orange" />
              <p
                className={classNames(
                  'text',
                  'text_size_large',
                  styles.headerTaskTaken
                )}
              >
                {title}
              </p>
            </div>
            <hr className={styles.titleLine} />
          </>
        )}

        {text && (
          <>
            <p
              className={classNames(
                'text',
                'text_size_medium',
                styles.contentText
              )}
            >
              {text}
            </p>
          </>
        )}

        {isContent && (
          <>
            {isTaskClose && (
              <div className={styles.buttonContentWrapper}>
                <div className={styles.buttonBlock}>
                  <SquareButton
                    buttonType="confirm"
                    // onClick={handleClickEditButton}
                    extClassName={styles.button_edit}
                  />
                  <span className={classNames('text', 'text_size_small')}>
                    Работы выполнены
                  </span>
                </div>
                <div className={styles.buttonBlock}>
                  <SquareButton buttonType="undone" />
                  <span className={classNames('text', 'text_size_small')}>
                    Работы не выполнены
                  </span>
                </div>
              </div>
            )}
            {isChangePassword && (
              <form id="savePassword" className={styles.formSavePass}>
                <label
                  className={classNames(
                    'text',
                    'text_size_small',
                    styles.labelForm
                  )}
                >
                  Пароль
                </label>
                <input className={styles.inputForm} type="password"></input>
                <label
                  className={classNames(
                    'text',
                    'text_size_small',
                    styles.labelForm
                  )}
                >
                  Повторите пароль
                </label>
                <input className={styles.inputForm} type="text"></input>
              </form>
            )}
            {isTaskResponseIcon && (
              <Informer
                extClassName={`${
                  isMobile ? styles.informerMobile : styles.informer
                }`}
                isMobile={isMobile}
              />
            )}
            {isTaskCancelation && (
              <div className={styles.buttonWrapper}>
                <Button label="Отменить" buttonType="secondary" />
                <Button label="Подтвердить" buttonType="primary" />
              </div>
            )}
            {isTaskCancelationReason && (
              <div className={styles.checkboxesWrapper}>
                <Checkbox
                  name="taskCancelationReason"
                  label="Не смогу прийти"
                  id={CancelationReasonIds.CANT_COME_IN}
                />
                <Checkbox
                  name="taskCancelationReason"
                  label="Отмена по обоюдному согласию"
                  id={CancelationReasonIds.CANCEL_FROM_BOTH_AGREMENT}
                />

                <Checkbox
                  name="taskCancelationReason"
                  label="Не могу указать причину"
                  id={CancelationReasonIds.UNKNOWN_REASON}
                />
              </div>
            )}
          </>
        )}
        {!isDeletePublication &&
          !isTaskClosingBeforePublicationRecipient &&
          !isTaskClosingBeforePublicationMaster &&
          !isTaskResponseIcon &&
          !isTaskOnMap &&
          !isTaskStarted &&
          !isChangePassword &&
          !isTaskClose &&
          !isTaskUndone &&
          !isTaskTaken && <hr className={styles.contentLine} />}

        {isGroupButton && (
          <>
            <div className={styles.buttonWrapper}>
              {isChangePassword && (
                <>
                  <Button label="Сохранить" buttonType="primary" />
                </>
              )}
              {isTaskClosingBeforePublicationRecipient && (
                <>
                  <Button label="Хочу" buttonType="primary" />
                </>
              )}
              {isTaskClosingBeforePublicationMaster && (
                <>
                  <Button label="Закрыть" buttonType="primary" />
                </>
              )}
              {isTaskConfirmDeletion && (
                <>
                  <Button label="Закрыть" buttonType="primary" />
                </>
              )}
              {isTaskResponse && (
                <>
                  <Button
                    label="Написать администратору"
                    buttonType="primary"
                  />
                </>
              )}
              {isTaskCancelation && (
                <>
                  <Button
                    label="Помощь администратора"
                    buttonType="secondary"
                  />
                </>
              )}
              {isTaskCancelationReason && (
                <>
                  <Button
                    label="Помощь администратора"
                    buttonType="secondary"
                  />
                  <Button label="Отменить заявку" buttonType="primary" />
                </>
              )}
              {isDeletePublication && (
                <>
                  <Button label="Удалить" buttonType="primary" />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </Tooltip>
  );
};
