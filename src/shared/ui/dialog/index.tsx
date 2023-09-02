import classNames from 'classnames';

import { Informer } from '../informer';
import { Button } from '../button';

import styles from './dialog.module.css';
import { Tooltip } from '../tooltip';
import { CloseCrossIcon } from '../icons/close-cross-icon';
import Checkbox from '../checkbox';
import { CancelationReasonIds } from './consts';
import { SquareButton } from '../square-buttons';

interface DialogProps {
  title?: string;
  text?: string;
  isContent?: boolean;
  isGroupButton?: boolean;
  isSuccessfulyClosed?: boolean;
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
  isAlertDialog?: boolean;
  isConfirmDialog?: boolean;
  extClassName?: string;
}

export const Dialog = ({
  title,
  text,
  isContent,
  isGroupButton,
  isSuccessfulyClosed,
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
  // isAlertDialog = false,
  // isConfirmDialog = false,
  extClassName,
}: DialogProps) => {
  const position = {
    top: 0,
    right: 0,
  };

  // const filterPositionStyles = {
  //   top: `${position.top}px`,
  //   right: `${window.innerWidth - position.right - 10}px`,
  // };

  const filterPositionStyles = {
    top: `${position.top}px`,
    right: `${position.right}px`,
  };

  return (
    <Tooltip
      pointerPosition={
        isTaskClosingBeforePublicationRecipient ||
        isTaskClosingBeforePublicationMaster ||
        isTaskOnMap
          ? 'center'
          : isChangePassword || isTaskClose
          ? 'null'
          : 'right'
      }
      // changeVisible={closeFilterMenu}
      elementStyles={filterPositionStyles}
      extClassName={classNames(
        styles.tooltip,
        `${(isChangePassword || isTaskClose) && styles.tooltipSmall} `
      )}
      visible
    >
      <div
        className={classNames(
          styles.container,
          `${(isChangePassword || isTaskClose) && styles.containerSmall} `,
          extClassName
        )}
      >
        {isExitButton && (
          <div className={styles.exitButtonWrapper}>
            <CloseCrossIcon
              className={styles.closeIcon}
              size="14"
              color="blue"
              // onClick={handleClosePopup}
            />
          </div>
        )}

        {title && (
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
            {isTaskResponseIcon && <Informer extClassName={styles.informer} />}
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
                  // checked={selectedCategories.includes(
                  //   FilterItemsIds.CATEGORY_1
                  // )}
                  id={CancelationReasonIds.CANT_COME_IN}
                  // onChange={handleCheckboxChange}
                  // disabled={!volunteerMainGuard ?? false}
                />
                <Checkbox
                  name="taskCancelationReason"
                  label="Отмена по обоюдному согласию"
                  // checked={selectedCategories.includes(
                  //   FilterItemsIds.CATEGORY_2
                  // )}
                  id={CancelationReasonIds.CANCEL_FROM_BOTH_AGREMENT}
                  // onChange={handleCheckboxChange}
                  // disabled={!volunteerMainGuard ?? false}
                />

                <Checkbox
                  name="taskCancelationReason"
                  label="Не могу указать причину"
                  // checked={selectedCategories.includes(
                  //   FilterItemsIds.CATEGORY_3
                  // )}
                  id={CancelationReasonIds.UNKNOWN_REASON}
                  // onChange={handleCheckboxChange}
                  // disabled={!volunteerMainGuard ?? false}
                />
              </div>
            )}
          </>
        )}
        {!isTaskResponse &&
          !isDeletePublication &&
          !isTaskClosingBeforePublicationRecipient &&
          !isTaskClosingBeforePublicationMaster &&
          !isTaskResponseIcon &&
          !isTaskOnMap &&
          !isSuccessfulyClosed &&
          !isChangePassword &&
          !isTaskClose && <hr className={styles.contentLine} />}

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
                  <Button label="Закрыть" buttonType="primary" />
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
