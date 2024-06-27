import { UserCard } from 'widgets/user-card';
import styles from './styles.module.css';
import { User } from 'entities/user/types';

interface TabProps {
  data: User[];
  view: 'tiles' | 'list';
}

export function RequestsTab({ data, view }: TabProps) {
  return (
    <div
      className={view === 'list' ? styles.userCardsList : styles.userCardsTiles}
    >
      {data.map((user: User) => (
        <UserCard key={user._id} user={user} viewMode={view} />
      ))}
    </div>
  );
}
