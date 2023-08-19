import { useState, MouseEvent, useRef, useEffect } from 'react';

import { PageSubMenuForAdmins } from 'widgets/page-sub-menu';
import { SideMenuForAuthorized } from 'widgets/side-menu';
import { Filter } from 'features/filter/ui';
import { UserInfo } from 'entities/user';
import { PageLayout } from 'shared/ui/page-layout';
import { Icon } from 'shared/ui/icons';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';

import styles from './styles.module.css';
import { Input } from 'shared/ui/input';
import { testUsers } from 'pages/requests/test-users';
import { UserCard } from 'widgets/user-card';

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

interface RequestsNotprocessedPageProps {
  isMaster: boolean;
}

export function RequestsNotprocessedPage(props: RequestsNotprocessedPageProps) {
  const [isFilterVisibel, setIsFilterVisibel] = useState(false);
  const [searchName, setSearchName] = useState('');

  const buttonFilterRef = useRef<Element>();

  // данные о позиции кнопки вызова фильтра, на основе которых определяется позиция фильтра
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });

  // открытие фильтра и определение данных о позиции кнопки, вызвавшей фильтр
  const getButtonPosition = () => {
    const buttonRect = buttonFilterRef.current?.getBoundingClientRect();
    if (buttonRect) {
      setButtonPosition({ top: buttonRect.bottom, right: buttonRect.right });
    }
  };

  const openFilter = (e: MouseEvent) => {
    e.stopPropagation();
    buttonFilterRef.current = e.currentTarget;
    getButtonPosition();
    setIsFilterVisibel(!isFilterVisibel);
  };

  useEffect(() => {
    window.addEventListener('resize', getButtonPosition);
    return () => {
      window.removeEventListener('resize', getButtonPosition);
    };
  }, []);

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
            <>
              <SmartHeader
                filterIcon={<Icon color="blue" icon="FilterIcon" size="54" />}
                filterText="Фильтр"
                onClick={openFilter}
                settingIcon={<Icon color="blue" icon="BlockIcon" size="54" />}
                settingText="Подтверждение / Блокировка"
              />

              {isFilterVisibel && (
                <Filter
                  userRole="admin"
                  changeVisible={() => setIsFilterVisibel(false)}
                  position={buttonPosition}
                />
              )}
            </>
          }
        >
          <PageSubMenuForAdmins />

          <Input
            extClassName={styles.input}
            value={searchName}
            name="name"
            onChange={(e) => setSearchName(e.target.value)}
            placeholder={'Введите имя'}
            type="name"
            label="Введите имя "
          />
          {props.isMaster && (
            <div className={styles.userAdminCards}>
              {testUsers
                .filter(
                  (user: UserProps) =>
                    user.userName
                      .toLowerCase()
                      .includes(searchName.toLowerCase()) &&
                    user.role === 'admin'
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
          )}
          <div className={styles.userCards}>
            {testUsers
              .filter(
                (user: UserProps) =>
                  user.userName
                    .toLowerCase()
                    .includes(searchName.toLowerCase()) && user.role !== 'admin'
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
