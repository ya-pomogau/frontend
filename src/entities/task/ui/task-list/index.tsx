import classNames from 'classnames';
import usePermission from 'shared/hooks/use-permission';
import { CONFIRMED } from 'shared/libs/statuses';

import { Informer } from 'shared/ui/informer';
import { RoundButton } from 'shared/ui/round-button';
import { TaskItem } from '../task';

import type { UserRole } from 'entities/user/types';
import type { Task } from 'entities/task/types';

import styles from './styles.module.css';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Tooltip } from 'shared/ui/tooltip';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';

import { useEffect, useRef, useState } from 'react';

import { Tooltip } from 'shared/ui/tooltip';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';

interface TaskListProps {
  userRole?: UserRole | null;
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
  const buttonGuard = usePermission([CONFIRMED], 'recipient');
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
        right: window.innerWidth - box.right - box.width * 2.25,
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

  useEffect(() => {
    window.addEventListener('resize', getCoords);

    return () => {
      window.removeEventListener('resize', getCoords);
    };
  }, []);

  return (
    <>
      {!isLoading && tasks.length > 0 && (
        <ul
          className={classNames(
            styles.content,
            'list',
            'p-0',
            'm-0',
            extClassName
          )}
        >
          {userRole === 'recipient' && (
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

          {tasks.map((item, index) => (
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
                isStatusActive={isStatusActive}
              />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && tasks.length === 0 && isStatusActive && (
        <div
          className={classNames(
            isMobile ? styles.content_empty_mobile : styles.content_empty,
            extClassName
          )}
        >
          <Informer text="У Вас пока нет заявок" />

          {userRole === 'recipient' && (
            <>
              <p
                className={`${styles.title_add_empty} text_size_large text_type_regular`}
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
                    Вы пока не можете создавать заявку. Дождитесь подтверждения
                    администратора
                  </div>
                </Tooltip>
              )}
            </>
          )}
        </div>
      )}

      {!isLoading && tasks.length === 0 && !isStatusActive && (
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
