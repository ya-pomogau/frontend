import classNames from 'classnames';
import usePermission from 'shared/hooks/use-permission';
import { CONFIRMED } from 'shared/libs/statuses';

import { Informer } from 'shared/ui/informer';
import { RoundButton } from 'shared/ui/round-button';
import { TaskItem } from '../task';

import type { Task } from 'entities/task/types';

import styles from './styles.module.css';
import { UserRole } from 'shared/types/common.types';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Tooltip } from 'shared/ui/tooltip';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';

interface TaskListProps {
  userRole?: UserRole | null;
  tasks: Array<Task>;
  extClassName?: string;
  isStatusActive: boolean;
  isMobile: boolean;
  isLoading: boolean;
  handleClickPnoneButton: () => void;
  handleClickMessageButton: () => void;
  handleClickConfirmButton: () => void;
  handleClickCloseButton: () => void;
  handleClickEditButton?: () => void;
  handleClickAddTaskButton?: () => void;
}

export const TaskList = ({
  userRole,
  tasks,
  extClassName,
  isStatusActive,
  isMobile,
  isLoading,
  handleClickPnoneButton,
  handleClickMessageButton,
  handleClickConfirmButton,
  handleClickCloseButton,
  handleClickEditButton,
  handleClickAddTaskButton,
}: TaskListProps) => {
  const buttonGuard = usePermission([CONFIRMED], UserRole.RECIPIENT);

  const [isOpen, setIsOpen] = useState(false);
  const handleDeniedAccess = () => {
    setIsOpen((prev) => !prev);
  };
  // const myRef = useRef<HTMLDivElement>(null);
  // const [tooltipStyle, setTooltipStyle] = useState({});

  // useEffect(() => {
  //   if (myRef.current) {
  //     const rect = myRef.current.getBoundingClientRect();
  //     setTooltipStyle({
  //       top: `${window.innerHeight - 140}px`,
  //       left: `${window.innerWidth - rect.left + 69}px`,
  //     });
  //   }
  // }, [isOpen]);

  const [popupPosion, setPopupPosion] = useState({ top: 0, right: 0 });
  const myRef = useRef<HTMLDivElement>(null);

  const calculateFilterPosition = useCallback(() => {
    const buttonRect = myRef.current?.getBoundingClientRect();

    if (buttonRect) {
      setPopupPosion({ top: buttonRect.bottom, right: buttonRect.right });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', calculateFilterPosition);

    return () => {
      window.removeEventListener('resize', calculateFilterPosition);
    };
  }, []);

  const popupPositionStyles = {
    top: `${popupPosion.top + 18}px`,
    right: `${window.innerWidth - popupPosion.right - 183}px`,
  };

  return (
    <>
      {/* TODO: удалить 52 строку, когда будут приходить данные тасок с сервера */}
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
          {userRole === UserRole.RECIPIENT && (
            <li className={isMobile ? styles.add_task_mobile : styles.add_task}>
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
                <TaskItem
                  category={item.category.name}
                  isMobile={isMobile}
                  date={item.date}
                  address={item.address}
                  description={item.description}
                  count={item.category.scope}
                  avatar={item.recipient.avatar}
                  completed={item.completed}
                  conflict={item.conflict}
                  confirmed={item.confirmed}
                  unreadMessages={item.chat?.unread}
                  recipientName={item.recipient.fullname}
                  recipientPhoneNumber={item.recipient.phone}
                  handleClickPhoneButton={handleClickPnoneButton}
                  handleClickMessageButton={handleClickMessageButton}
                  handleClickConfirmButton={
                    item.completed && !item.confirmed
                      ? handleClickConfirmButton
                      : undefined
                  }
                  handleClickCloseButton={
                    isStatusActive ? handleClickCloseButton : undefined
                  }
                  handleClickEditButton={
                    isStatusActive ? handleClickEditButton : undefined
                  }
                />
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
                className={`${styles.title_add_empty} text_size_large text_type_regular`}
              >
                {' '}
                Хотите создать заявку?
              </p>
              <div ref={myRef}>
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
                  changeVisible={handleDeniedAccess}
                  elementStyles={popupPositionStyles}
                >
                  <div className={styles.closeWrapper}>
                    <CloseCrossIcon
                      className={styles.closeIcon}
                      size="14"
                      color="blue"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                  <div className={styles.text}>
                    Вы пока не можете создавать заявку. Дождитесь подтверждения
                    администратора
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
