import classNames from 'classnames';
import { CategoriesBackground } from 'shared/ui/categories-background';
import placeholder from './img/placeholder.svg';
import styles from './styles.module.css';
import { TaskInfo } from './components/task-info';
import { TaskDescription } from './components/task-description';
import { TaskRecipient } from './components/task-recipient';
import { TaskButtons } from './components/task-buttons';

interface TaskItemProps {
  category: {
    id: string;
    name: string;
    scope: number;
  };
  date?: string;
  address: string;
  description: string;
  count: number;
  avatar?: string;
  completed: boolean;
  confirmed: boolean;
  conflict?: boolean;
  recipientName?: string;
  recipientPhoneNumber?: string;
  unreadMessages?: number;
  isStatusActive?: boolean;
  extClassName?: string;
  handleEditButton?: () => void;
}

export const TaskItem = ({
  category,
  date,
  time,
  address,
  description,
  count,
  avatar = placeholder,
  completed,
  confirmed,
  conflict = false,
  recipientName,
  recipientPhoneNumber,
  unreadMessages,
  isStatusActive,
  extClassName,
  handleEditButton,
}: TaskItemProps) => {
  const taskLayout =
    confirmed && completed
      ? styles.container_main_default
      : confirmed
      ? styles.container_main_confirmed
      : conflict
      ? styles.container_main_conflict
      : styles.container_main_default;

  return (
    <div
      className={classNames(
        styles.container_main,
        'text',
        taskLayout,
        extClassName
      )}
    >
      <CategoriesBackground
        theme="primary"
        content={category.name}
        size={category.name.length > 24 ? 'large' : 'medium'}
        extClassName={styles.category}
      />
      <TaskInfo date={date} address={address} extClassName={styles.taskInfo} />
      <TaskDescription
        description={description}
        count={count}
        extClassName={styles.description}
      />
      <TaskRecipient
        avatar={avatar}
        recipientName={recipientName}
        recipientPhoneNumber={recipientPhoneNumber}
        connection={completed}
        unreadMessages={unreadMessages}
        extClassName={styles.recipient}
      />
      <TaskButtons
        recipientName={recipientName}
        address = {address}
        description = {description}
        category={category}
        date={date}
        isStatusActive
        completed
        conflict
        extClassName={styles.buttons}
      />
    </div>
  );
};
