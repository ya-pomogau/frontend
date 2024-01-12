import { UserCard } from 'widgets/user-card';
import styles from './styles.module.css';
import { UserCardType } from '../../shared/types/user-cards.types';

interface TabProps {
  data: UserCardType[];
}

export function RequestsTab({ data }: TabProps) {
  return (
    <div className={styles.userCards}>
      {data.map((user: UserCardType) => (
        <UserCard key={user.userId} {...user} />
      ))}
    </div>
  );
}
