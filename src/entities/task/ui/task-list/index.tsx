import classNames from 'classnames';
import usePermission from 'shared/hooks/use-permission';
import { CONFIRMED } from 'shared/libs/statuses';

import { Informer } from 'shared/ui/informer';
import { RoundButton } from 'shared/ui/round-button';
import { TaskItem } from '../task';

import type { UserRole } from 'entities/user/types';
import type { Task } from 'entities/task/types';

import styles from './styles.module.css';
import { useAppSelector } from 'app/hooks';
import { useState } from 'react';
import { Dialog } from 'shared/ui/dialog';
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
  const handleDeniedAccess = () => {
    setIsOpen(!isOpen);
    isOpen &&
      console.log('Вам пока нельзя такое, дождитесь проверки администратором');
    !isOpen && console.log('Закрыли');
  };
  const isConfirmed = useAppSelector((store) => {
    return store.user.data?.status === CONFIRMED;
  });

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
              <RoundButton
                buttonType="add"
                onClick={
                  buttonGuard ? handleClickAddTaskButton : handleDeniedAccess
                }
                extClassName={styles.add_task_icon_unconf}
                size="large"
              />
              <Tooltip
                visible={isOpen}
                extClassName={styles.modal}
                pointerPosition="center"
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
