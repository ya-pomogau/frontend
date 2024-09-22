import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { usePermission, useUser, useControlModal } from 'shared/hooks';
import { RoundButton, Informer, Tooltip, Icon } from 'shared/ui';
import { unauthorizedRecipientPopupMessage } from 'shared/libs/constants';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { TaskItem } from '../task';
import {
  UserRole,
  userRole as userRoles,
  userStatus,
} from 'shared/types/common.types';

import type { Task } from 'entities/task/types';

import styles from './styles.module.css';

interface TaskListProps {
  userRole: UserRole | null;
  tasks: Array<Task>;
  extClassName?: string;
  isStatusActive: boolean;
  isMobile: boolean;
  isLoading: boolean;
  handleClickAddTaskButton?: () => void;
  isTabPage?: boolean;
}

interface Coords {
  right: number;
  top: number;
}

export const TaskList = ({
  userRole,
  tasks,
  extClassName,
  isStatusActive,
  isMobile,
  isLoading,
  handleClickAddTaskButton,
  isTabPage,
}: TaskListProps) => {
  const [popupPosion, setPopupPosion] = useState<Coords | null>(null);

  const { isOpen, handleOpen, handleClose } = useControlModal();

  const buttonRef = useRef<HTMLDivElement>(null);

  const user = useUser();
  const role = user?.role;

  const location = useLocation();
  const isCompletedPage = location.pathname.includes('/profile/completed');

  const isAdmin = role === userRoles.ADMIN;
  const isRecipient = userRole === userRoles.RECIPIENT;
  const isTaskListEmpty = tasks && tasks.length === 0;
  const isRecipientAndNoTasks =
    isTaskListEmpty && isRecipient && isStatusActive && !isAdmin;
  const hasAccess =
    (!isStatusActive && isRecipient && !isCompletedPage) ||
    (isRecipient && isTabPage);

  const buttonGuard = usePermission(
    [userStatus.CONFIRMED],
    userRoles.RECIPIENT
  );

  const contentStyles = classNames(
    styles.content,
    {
      [styles.content_admin]: isAdmin,
      [styles.content_default]: !isAdmin,
    },
    'p-0 m-0',
    extClassName
  );

  const addTaskStyles = classNames({
    [styles.add_task_mobile]: isMobile,
    [styles.add_task]: !isMobile,
  });

  const addTaskIconStyles = classNames(
    styles.add_task_icon,
    {
      [styles.add_task_icon_unconf]: !buttonGuard,
    },
    styles.medium_add_button
  );

  const titleAddListStyles = classNames(
    styles.title_add_list,
    {
      text_size_medium: isMobile,
      text_size_large: !isMobile,
    },
    'text_type_regular'
  );

  const contentEmptyStyles = classNames(
    styles.content_empty,
    {
      [styles.content_empty_mobile]: isMobile,
      [styles.content_empty_desktop]: !isMobile,
    },
    extClassName
  );

  const titleAddEmptyStyles = classNames(
    styles.title_add_empty,
    'text_size_large',
    'text_type_regular',
    {
      [styles.title_add_empty_mobile]: isMobile,
      [styles.title_add_empty_desktop]: !isMobile,
    }
  );

  const getCoords = () => {
    const box = buttonRef.current?.getBoundingClientRect();
    if (box) {
      setPopupPosion({
        right: window.innerWidth - box.right - box.width * 2.04 + 14,
        top: box.top + window.scrollY + box.height * 1.2,
      });
    }
  };

  const handleDeniedAccess = () => {
    if (!isOpen) {
      getCoords();
    }
    handleOpen();
  };

  useEffect(() => {
    window.addEventListener('resize', getCoords);
    return () => {
      window.removeEventListener('resize', getCoords);
    };
  }, []);

  return (
    <>
      {!tasks && <p>список тасок, которые будут получены с сервера</p>}
      {!isLoading && tasks && (
        <ul className={contentStyles}>
          {hasAccess && (
            <li className={addTaskStyles}>
              <RoundButton
                buttonType="addMedium"
                onClick={
                  buttonGuard ? handleClickAddTaskButton : handleDeniedAccess
                }
                size={'medium'}
                extClassName={addTaskIconStyles}
              />
              <h2 className={titleAddListStyles}>Создать заявку</h2>
            </li>
          )}
          {tasks.map((item, index) => (
            <li key={index}>
              <TaskItem item={item} userRole={userRole} />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && isRecipientAndNoTasks && (
        <div className={contentEmptyStyles}>
          <Informer
            extClassName={styles.content_empty_note}
            text="У Вас пока нет заявок"
          />

          {isRecipient && (
            <>
              <p className={titleAddEmptyStyles}>Хотите создать заявку?</p>
              <div className={styles.wrapperBtn} ref={buttonRef}>
                <Icon
                  className={styles.content_empty_arrow}
                  icon="ArrowNotify"
                  color={'blue'}
                />
                <RoundButton
                  buttonType="addLarge"
                  onClick={
                    buttonGuard ? handleClickAddTaskButton : handleDeniedAccess
                  }
                  extClassName={styles.add_task_icon_unconf}
                  size="large"
                />
              </div>
              {isOpen && (
                <Tooltip
                  visible
                  extClassName={styles.modal}
                  pointerPosition="center"
                  changeVisible={() => handleClose()}
                  elementStyles={{
                    position: 'absolute',
                    top: `${popupPosion?.top}px`,
                    right: `${popupPosion?.right}px`,
                  }}
                >
                  <div className={styles.closeWrapper}>
                    <CloseCrossIcon
                      className={styles.closeIcon}
                      size="14"
                      color="blue"
                      onClick={() => handleClose()}
                    />
                  </div>
                  <div className={styles.text}>
                    {unauthorizedRecipientPopupMessage}
                  </div>
                </Tooltip>
              )}
            </>
          )}
        </div>
      )}

      {isAdmin && isTaskListEmpty && isStatusActive && (
        <div className={contentEmptyStyles}>
          <Informer
            text={
              userRole === userRoles.RECIPIENT
                ? 'У данного реципиента нет активных заявок'
                : userRole === userRoles.VOLUNTEER
                ? 'У данного волонтера нет заявок в работе'
                : 'Нет доступных заявок'
            }
          />
        </div>
      )}

      {isTaskListEmpty && !isStatusActive && (
        <div className={contentEmptyStyles}>
          <Informer
            text={
              isCompletedPage
                ? 'У Вас нет завершенных заявок'
                : 'У Вас пока нет заявок'
            }
          />
        </div>
      )}
    </>
  );
};
