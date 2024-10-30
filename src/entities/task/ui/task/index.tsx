import classNames from 'classnames';
import { CategoriesBackground } from 'shared/ui/categories-background';
import styles from './styles.module.css';
import { TaskInfo } from './components/task-info';
import { TaskDescription } from './components/task-description';
import { TaskUser } from './components/task-user';
import { TaskButtons } from './components/task-buttons';
import {
  taskStatus,
  type Task,
  taskReport,
  resolveStatus,
} from 'entities/task/types';
import { UserRole, userRole as userRoles } from 'shared/types/common.types';

export interface TaskItemProps {
  item: Task;
  extClassName?: string;
  userRole: UserRole | null;
}
export const TaskItem = ({
  item: {
    category,
    date,
    address,
    status,
    description,
    recipient,
    recipientReport,
    volunteer,
    volunteerReport,
    adminResolve,
    _id,
    location,
  },
  userRole,
  extClassName,
}: TaskItemProps) => {
  const taskConfirmed = () => {
    if (
      adminResolve === null ||
      adminResolve === resolveStatus.PENDING ||
      adminResolve === resolveStatus.VIRGIN
    ) {
      return (
        (userRole === userRoles.VOLUNTEER &&
          volunteerReport === taskReport.FULFILLED) ||
        (userRole === userRoles.RECIPIENT &&
          recipientReport === taskReport.FULFILLED)
      );
    } else if (adminResolve === resolveStatus.FULFILLED) {
      return true;
    } else {
      return false;
    }
  };

  const taskConflict = () => {
    if (
      adminResolve === null ||
      adminResolve === resolveStatus.PENDING ||
      adminResolve === resolveStatus.VIRGIN
    ) {
      return (
        (userRole === userRoles.VOLUNTEER &&
          volunteerReport === taskReport.REJECTED) ||
        (userRole === userRoles.RECIPIENT &&
          recipientReport === taskReport.REJECTED)
      );
    } else if (adminResolve === resolveStatus.REJECTED) {
      return true;
    } else {
      return false;
    }
  };

  const taskLayout = taskConfirmed()
    ? styles.container_main_confirmed
    : taskConflict()
    ? styles.container_main_conflict
    : '';

  return (
    <>
      <article
        className={classNames(
          styles.container_main,
          'text',
          taskLayout,
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
        <TaskUser
          user={userRoles.RECIPIENT === userRole ? volunteer : recipient}
          extClassName={styles.user}
          date={date}
          volunteer={volunteer}
          status={status}
        />
        <TaskButtons
          //TODO: заменить completed conflict на правильные поля
          location={location}
          taskId={_id}
          address={address}
          description={description}
          category={category}
          date={date}
          conflict={status === taskStatus.CONFLICTED}
          volunteer={volunteer}
          extClassName={styles.buttons}
          volunteerReport={volunteerReport}
          recipientReport={recipientReport}
          adminResolve={adminResolve}
        />
      </article>
    </>
  );
};
