import { useGetUsersQuery } from 'services/user-api';
import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { SideMenuForAuthorized } from 'widgets/side-menu';

import { UserInfo } from 'entities/user';

import { PageLayout } from 'shared/ui/page-layout';
import { Icon } from 'shared/ui/icons';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Loader } from 'shared/ui/loader';
import { UserCard } from 'widgets/user-card';

import styles from './styles.module.css';
import { UserCard } from 'widgets/user-card';
import { testUsers } from 'pages/requests/test-users';
import { Input } from 'shared/ui/input';

interface UserProps {
  role: 'volunteer' | 'recipient' | 'admin' | 'master';
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId: number;
  userNumber: string;
  volunteerInfo?: any;
}

export function RequestsAdminsPage() {
  const { isLoading, data = [] } = useGetUsersQuery('admin', {
    pollingInterval: 30000,
  });
  const [searchName, setSearchName] = useState('');

  return (
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>

          <SideMenuForAuthorized />
        </>
      }
      content={
        <ContentLayout
          heading={
            <SmartHeader
              icon={<Icon color="blue" icon="BlockIcon" size="54" />}
              text="Подтверждение / Блокировка"
            />
          }
        >
          <PageSubMenuForAdmins />
          /*
                    {isLoading ? (
            <Loader />
          ) : (
            <ul>
              {data.map((item: any) => {
                return (
                  <li key={item.data.id}>
                    <UserCard
                      avatarLink={item.data.avatar}
                      avatarName={item.data.fullname}
                      userName={item.data.fullname}
                      userId={item.data.id}
                      userNumber={item.data.phone}
                    />
                  </li>
                );
              })}
            </ul>
          )}*/
          

          <Input
            extClassName={styles.input}
            value={searchName}
            name="name"
            onChange={(e) => setSearchName(e.target.value)}
            placeholder={'Введите имя'}
            type="name"
            label="Введите имя "
          />

          <div className={styles.userAdminCards}>
            {testUsers
              .filter(
                (user: UserProps) =>
                  user.userName
                    .toLowerCase()
                    .includes(searchName.toLowerCase()) && user.role === 'admin'
              )
              .map((user: UserProps) => (
                <UserCard
                  role={user.role}
                  key={user.userId}
                  avatarLink={user.avatarLink}
                  avatarName={user.avatarName}
                  userName={user.userName}
                  userId={user.userId}
                  userNumber={user.userNumber}
                  volunteerInfo={user.volunteerInfo}
                />
              ))}
          </div>
        </ContentLayout>
      }
    />
  );
}
