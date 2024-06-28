import classNames from 'classnames';
import usePermission from 'shared/hooks/use-permission';

import { Informer } from 'shared/ui/informer';
import { RoundButton } from 'shared/ui/round-button';
import { TaskItem } from '../task';

import type { Task } from 'entities/task/types';

import styles from './styles.module.css';
import { UserRole, UserStatus } from 'shared/types/common.types';

import { useEffect, useRef, useState } from 'react';

import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { Tooltip } from 'shared/ui/tooltip';
import { unauthorizedRecipientPopupMessage } from 'shared/libs/constants';
import { useLocation } from 'react-router-dom';

interface TaskListProps {
  userRole: UserRole | null;
  tasks: Array<Task>;
  extClassName?: string;
  isStatusActive: boolean;
  isMobile: boolean;
  isLoading: boolean;
  handleClickAddTaskButton?: () => void;
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
}: TaskListProps) => {
  const buttonGuard = usePermission([UserStatus.CONFIRMED], UserRole.RECIPIENT);
  const location = useLocation();
  const isCompletedPage = location.pathname.includes('/profile/completed');
  const [isOpen, setIsOpen] = useState(false);

  const [popupPosion, setPopupPosion] = useState<Coords | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popupClose = () => {
    setIsOpen(false);
  };

  const getCoords = () => {
    const box = buttonRef.current?.getBoundingClientRect();

    if (box) {
      setPopupPosion({
        right: window.innerWidth - box.right - box.width * 2.25 + 14,
        top: box.top + window.scrollY + box.height * 1.2,
      });
    }
  };

  const handleDeniedAccess = () => {
    if (!isOpen) {
      getCoords();
    }
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    window.addEventListener('resize', getCoords);

    return () => {
      window.removeEventListener('resize', getCoords);
    };
  }, []);

  return (
    <>
      {/* TODO: удалить след. строку, когда будут приходить данные тасок с сервера */}
      {!tasks && <p>список тасок, которые будут получены с сервера</p>}
      {!isLoading && tasks && (
        <ul
          className={classNames(
            styles.content,
            'list',
            'p-0',
            'm-0',
            extClassName
          )}
        >
          {!isStatusActive &&
            userRole === UserRole.RECIPIENT &&
            !isCompletedPage && (
              <li
                className={isMobile ? styles.add_task_mobile : styles.add_task}
              >
                <RoundButton
                  buttonType="add"
                  onClick={
                    buttonGuard ? handleClickAddTaskButton : handleDeniedAccess
                  }
                  size={isMobile ? 'medium' : 'large'}
                  extClassName={styles.add_task_icon}
                />

                <h2
                  className={`${styles.title_add_list} ${
                    isMobile ? 'text_size_medium' : 'text_size_large'
                  } text_type_regular`}
                >
                  Создать заявку
                </h2>
              </li>
            )}
          {tasks &&
            tasks.map((item, index) => (
              <li key={index}>
                <TaskItem item={item} userRole={userRole} />
              </li>
            ))}
        </ul>
      )}

      {!isLoading && tasks && tasks.length === 0 && isStatusActive && (
        <div
          className={classNames(
            isMobile ? styles.content_empty_mobile : styles.content_empty,
            extClassName
          )}
        >
          <Informer text="У Вас пока нет заявок" />

          {userRole === UserRole.RECIPIENT && (
            <>
              <p
                className={`${styles.title_add_empty} text_size_large text_type_regular text `}
              >
                {' '}
                Хотите создать заявку?
              </p>
              <div className={styles.wrapperBtn} ref={buttonRef}>
                <RoundButton
                  buttonType="add"
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
                  changeVisible={() => popupClose()}
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
                      onClick={() => popupClose()}
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

      {!isLoading && tasks && tasks.length === 0 && !isStatusActive && (
        <div
          className={classNames(
            isMobile ? styles.content_empty_mobile : styles.content_empty,
            extClassName
          )}
        >
          <Informer text="У Вас нет завершенных заявок" />
        </div>
      )}
    </>
  );
};
