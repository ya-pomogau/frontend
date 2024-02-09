import classNames from 'classnames';
import { CategoriesBackground } from 'shared/ui/categories-background';
import placeholder from './img/placeholder.svg';
import styles from './styles.module.css';
import { TaskInfo } from './components/task-info';
import { TaskDescription } from './components/task-description';
import { TaskRecipient } from './components/task-recipient';
import { TaskButtons } from './components/task-buttons';
import { Category } from 'entities/task/types';
import { UserProfile } from 'entities/user/types';
import { isAfter, parseISO } from 'date-fns';

interface TaskItemProps {
  taskId: string;
  category: Category;
  date?: string;
  address: string;
  description: string;
  count: number;
  avatar?: string;
  recipientName?: string;
  recipientPhoneNumber?: string;
  volunteer: UserProfile | null;
  unreadMessages?: number;
  isStatusActive?: boolean;
  extClassName?: string;
}
// TODO: сделать передачу item в TaskItem вместо тысячи пропсов
export const TaskItem = ({
  taskId,
  category,
  date,
  address,
  description,
  count,
  avatar = placeholder,
  recipientName,
  volunteer,
  recipientPhoneNumber,
  isStatusActive,
  extClassName,
}: TaskItemProps) => {
  //TODO: confirmed && completed заменить на новые поля объекта
  // const taskLayout =
  //   confirmed && completed
  //     ? styles.container_main_default
  //     : confirmed
  //     ? styles.container_main_confirmed
  //     : conflict
  //     ? styles.container_main_conflict
  //     : styles.container_main_default;
  //TODO: использовать деструктуризацию для записи полей таски
  return (
    <>
      <div
        className={classNames(
          styles.container_main,
          'text',
          // taskLayout,
          extClassName
        )}
      >
        <CategoriesBackground
          theme="primary"
          content={category.title}
          size={category.title.length > 24 ? 'large' : 'medium'}
          extClassName={styles.category}
        />
        <TaskInfo
          date={date}
          address={address}
          extClassName={styles.taskInfo}
        />
        <TaskDescription
          description={description}
          count={count}
          extClassName={styles.description}
        />
        <TaskRecipient
          avatar={avatar}
          recipientName={recipientName}
          recipientPhoneNumber={recipientPhoneNumber}
          //TODO: заменить volunteer === null ? false : true на правильное условие
          connection={volunteer === null ? false : true}
          extClassName={styles.recipient}
        />
        <TaskButtons
          //TODO: заменить completed conflict на правильные поля
          taskId={taskId}
          recipientName={recipientName}
          address={address}
          description={description}
          category={category}
          date={date}
          isStatusActive
          completed
          conflict
          extClassName={styles.buttons}
        />
      </div>
    </>
  );
};
