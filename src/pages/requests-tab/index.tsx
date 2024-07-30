import { UserCard } from 'widgets/user-card';
import styles from './styles.module.css';
import { User } from 'entities/user/types';

interface TabProps {
  data: User[];
  viewMode: 'tiles' | 'list';
  height?: string;
}

export function RequestsTab({ data, viewMode, height }: TabProps) {
  return (
    <div
      style={{ height: height }}
      className={
        viewMode === 'list' ? styles.userCardsList : styles.userCardsTiles
      }
    >
      {data.map((user: User) => (
        <UserCard key={user._id} user={user} viewMode={viewMode} />
      ))}
    </div>
  );
}
