import classNames from 'classnames';
import { CategoriesBackground } from 'shared/ui/categories-background';
import styles from './styles.module.css';
import { TaskInfo } from './components/task-info';
import { TaskDescription } from './components/task-description';
import { TaskUser } from './components/task-user';
import { TaskButtons } from './components/task-buttons';
import { TaskStatus, type Task } from 'entities/task/types';
import { useAppSelector } from 'app/hooks';
import { UserRole } from 'shared/types/common.types';

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
    recipient,
    volunteer,
    status,
    volunteerReport,
    recipientReport,
    adminResolve,
  },
  extClassName,
}: TaskItemProps) => {
  const role = useAppSelector((state) => state.user.role);
  return (
    <>
      <div className={classNames(styles.container_main, 'text', extClassName)}>
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
        <TaskUser
          user={UserRole.RECIPIENT === role ? volunteer : recipient}
          extClassName={styles.user}
          date={date}
        />
        <TaskButtons
          address={address}
          description={description}
          category={category}
          date={date}
          conflict={status === TaskStatus.CONFLICTED}
          volunteer={volunteer}
          extClassName={styles.buttons}
          volunteerReport={volunteerReport}
          recipientReport={recipientReport}
          adminResolve={adminResolve}
        />
      </div>
    </>
  );
};
