import { UserCardForTasks } from 'widgets/user-card-for-tasks';
import { User } from 'entities/user/types';
import styles from './styles.module.css';
import cn from 'classnames';

interface TabProps {
  data: User[];
  onUserClick: (user: User) => void;
}

export function TasksTab({ data, onUserClick }: TabProps) {
  return (
    <ul className={cn(styles.userCards, styles.userCardsList)}>
      {data.map((user: User) => (
        <UserCardForTasks
          key={user._id}
          user={user}
          onClick={() => onUserClick(user)}
        />
      ))}
    </ul>
  );
}
