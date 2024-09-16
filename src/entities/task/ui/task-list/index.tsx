import classNames from 'classnames';
import usePermission from 'shared/hooks/use-permission';

import { Informer } from 'shared/ui/informer';
import { RoundButton } from 'shared/ui/round-button';
import { TaskItem } from '../task';

import type { Task } from 'entities/task/types';

import styles from './styles.module.css';
import {
  UserRole,
  userRole as userRoles,
  userStatus,
} from 'shared/types/common.types';

import { useEffect, useRef, useState } from 'react';

import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { Tooltip } from 'shared/ui/tooltip';
import { unauthorizedRecipientPopupMessage } from 'shared/libs/constants';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { Icon } from 'shared/ui';

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
  const { role } = useAppSelector((state) => state.user);
  const buttonGuard = usePermission(
    [userStatus.CONFIRMED],
    userRoles.RECIPIENT
  );
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
        right: window.innerWidth - box.right - box.width * 2.04 + 14,
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
            {
              [styles.content_admin]: role === userRoles.ADMIN,
              [styles.content_default]: role !== userRoles.ADMIN,
            },
            'p-0 m-0',
            extClassName
          )}
        >
          {((!isStatusActive &&
            userRole === userRoles.RECIPIENT &&
            !isCompletedPage) ||
            (userRole === userRoles.RECIPIENT && isTabPage)) && (
            <li
              className={classNames({
                [styles.add_task_mobile]: isMobile,
                [styles.add_task]: !isMobile,
              })}
            >
              <RoundButton
                buttonType="addMedium"
                onClick={
                  buttonGuard ? handleClickAddTaskButton : handleDeniedAccess
                }
                size={'medium'}
                extClassName={classNames(
                  styles.add_task_icon,
                  {
                    [styles.add_task_icon_unconf]: !buttonGuard,
                  },
                  styles.medium_add_button
                )}
              />
              <h2
                className={classNames(
                  styles.title_add_list,
                  {
                    text_size_medium: isMobile,
                    text_size_large: !isMobile,
                  },
                  'text_type_regular'
                )}
              >
                Создать заявку
              </h2>
            </li>
          )}
          {tasks.map((item, index) => (
            <li key={index}>
              <TaskItem item={item} userRole={userRole} />
            </li>
          ))}
        </ul>
      )}

      {!isLoading &&
        tasks &&
        tasks.length === 0 &&
        isStatusActive &&
        role !== userRoles.ADMIN && (
          <div
            className={classNames(
              styles.content_empty,
              {
                [styles.content_empty_mobile]: isMobile,
                [styles.content_empty_desktop]: !isMobile,
              },
              extClassName
            )}
          >
            <Informer
              extClassName={styles.content_empty_note}
              text="У Вас пока нет заявок"
            />

            {userRole === userRoles.RECIPIENT && (
              <>
                <p
                  className={classNames(
                    styles.title_add_empty,
                    'text_size_large',
                    'text_type_regular',
                    {
                      [styles.title_add_empty_mobile]: isMobile,
                      [styles.title_add_empty_desktop]: !isMobile,
                    }
                  )}
                >
                  {' '}
                  Хотите создать заявку?
                </p>
                <div className={styles.wrapperBtn} ref={buttonRef}>
                  <Icon
                    className={styles.content_empty_arrow}
                    icon="ArrowNotify"
                    color={'blue'}
                  />
                  <RoundButton
                    buttonType="addLarge"
                    onClick={
                      buttonGuard
                        ? handleClickAddTaskButton
                        : handleDeniedAccess
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

      {role === userRoles.ADMIN &&
        !isLoading &&
        tasks &&
        tasks.length === 0 &&
        isStatusActive && (
          <div
            className={classNames(
              styles.content_empty,
              {
                [styles.content_empty_mobile]: isMobile,
                [styles.content_empty_desktop]: !isMobile,
              },
              extClassName
            )}
          >
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

      {!isLoading && tasks && tasks.length === 0 && !isStatusActive && (
        <div
          className={classNames(
            styles.content_empty,
            {
              [styles.content_empty_mobile]: isMobile,
              [styles.content_empty_desktop]: !isMobile,
            },
            extClassName
          )}
        >
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
