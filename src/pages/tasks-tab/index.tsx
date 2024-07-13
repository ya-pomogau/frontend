import { UserCardForTasks } from 'widgets/user-card-for-tasks';
import styles from './styles.module.css';
import { User } from 'entities/user/types';

interface TabProps {
  data: User[];
  onUserClick: (user: User) => void;
}

export function TasksTab({ data, onUserClick }: TabProps) {
  return (
    <div className={styles.userCards}>
      {data.map((user: User) => (
        <UserCardForTasks
          key={user._id}
          user={user}
          onClick={() => onUserClick(user)}
        />
      ))}
    </div>
  );
}
