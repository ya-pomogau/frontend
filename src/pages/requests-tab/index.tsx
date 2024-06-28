import { UserCard } from 'widgets/user-card';
import styles from './styles.module.css';
import { User } from 'entities/user/types';

interface TabProps {
  data: User[];
}

export function RequestsTab({ data }: TabProps) {
  return (
    <div className={styles.userCards}>
      {data.map((user: User) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}
