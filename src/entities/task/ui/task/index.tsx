import classNames from 'classnames';
import { CategoriesBackground } from 'shared/ui/categories-background';
import styles from './styles.module.css';
import { TaskInfo } from './components/task-info';
import { TaskDescription } from './components/task-description';
import { TaskRecipient } from './components/task-recipient';
import { TaskButtons } from './components/task-buttons';
import type { Task } from 'entities/task/types';

export interface TaskItemProps {
  item: Task;
  extClassName?: string;
}
export const TaskItem = ({
  item: {
    category,
    date,
    address,
    description,
    recipient: { name, phone, avatar },
    volunteer,
  },
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
          count={category.points}
          extClassName={styles.description}
        />
        <TaskRecipient
          avatar={avatar}
          recipientName={name}
          recipientPhoneNumber={phone}
          //TODO: заменить volunteer === null ? false : true на правильное условие
          connection={volunteer === null ? false : true}
          extClassName={styles.recipient}
        />
        <TaskButtons
          //TODO: заменить completed conflict на правильные поля
          recipientName={name}
          address={address}
          description={description}
          category={category}
          date={date}
          completed
          conflict
          extClassName={styles.buttons}
        />
      </div>
    </>
  );
};
