import TaskButtonsRecipient from './components/task-buttons-recipient';
import TaskButtonsVolunteer from './components/task-buttons-volunteer';
import TaskButtonsAdmin from './components/task-buttons-admin';
import { userRole as userRoles } from 'shared/types/common.types';
import { TaskButtonsProps } from './types';
import { useAppSelector } from 'app/hooks';

export const TaskButtons = (props: TaskButtonsProps) => {
  const userRole = useAppSelector((state) => state.user.role);
  switch (userRole) {
    case userRoles.VOLUNTEER:
      return <TaskButtonsVolunteer {...props} />;
    case userRoles.RECIPIENT:
      return <TaskButtonsRecipient {...props} />;
    case userRoles.ADMIN:
      return <TaskButtonsAdmin {...props} />;
    default:
      return null;
  }
};