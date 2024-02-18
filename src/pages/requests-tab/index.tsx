import { UserCard } from 'widgets/user-card';
import styles from './styles.module.css';
import {
  useGetUserByRolesQuery,
  useGetAllAdminsQuery,
} from 'services/admin-api';
import { User } from 'entities/user/types';

interface TabProps {
  data: User[];
}

export function RequestsTab({ data }: TabProps) {
  const { data: data1 } = useGetUserByRolesQuery('volunteers');
  const { data: allAdmins } = useGetAllAdminsQuery('');
  const { data: data2 } = useGetUserByRolesQuery('recipients');
  const { data: data3 } = useGetUserByRolesQuery('unconfirmed');
  console.log('🚀  unconfirmed:', data3);
  console.log('🚀  recipients:', data2);
  console.log('🚀  allAdmins:', allAdmins);
  console.log('🚀  volunteers:', data1);
  return (
    <div className={styles.userCards}>
      {data.map((user: User) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}
