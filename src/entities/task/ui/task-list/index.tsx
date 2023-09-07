import classNames from 'classnames';
import usePermission from 'shared/hooks/use-permission';
import { CONFIRMED } from 'shared/libs/statuses';

import { Informer } from 'shared/ui/informer';
import { RoundButton } from 'shared/ui/round-button';
import { TaskItem } from '../task';

import type { UserRole } from 'entities/user/types';
import type { Task } from 'entities/task/types';

import styles from './styles.module.css';

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
  const buttonGuard = usePermission([CONFIRMED], 'recipient');

  const handleDeniedAccess = () => {
    alert('Вам пока нельзя такое, дождитесь проверки администратором');
  };

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
                size="large"
              />
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
