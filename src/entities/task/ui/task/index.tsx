import classNames from 'classnames';
import { CategoriesBackground } from 'shared/ui/categories-background';
import styles from './styles.module.css';
import { TaskInfo } from './components/task-info';
import { TaskDescription } from './components/task-description';
import { TaskUser } from './components/task-user';
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
    status,
    volunteerReport,
    recipientReport,
    adminResolve,
  },
  extClassName,
}: TaskItemProps) => {
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
          avatar={avatar}
          name={name}
          phone={phone}
          status={status}
          connection={volunteer === null ? false : true}
          extClassName={styles.recipient}
          date={date}
        />
        <TaskButtons
          recipientName={name}
          address={address}
          description={description}
          category={category}
          date={date}
          conflict
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
