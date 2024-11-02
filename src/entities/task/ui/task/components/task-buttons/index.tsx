import { useUser } from 'shared/hooks';
import { userRole as userRoles } from 'shared/types/common.types';
import {
  TaskButtonsRecipient,
  TaskButtonsVolunteer,
  TaskButtonsAdmin,
} from './components';
import { TaskButtonsProps } from './types';

export const TaskButtons = (props: TaskButtonsProps) => {
  const { role = null } = useUser() || {};

  switch (role) {
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
