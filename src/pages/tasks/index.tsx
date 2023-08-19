import { useState } from 'react';

import { SideMenuForAuthorized } from 'widgets/side-menu';

import { Filter } from 'features/filter';
import { UserInfo } from 'entities/user';

import { PageLayout } from 'shared/ui/page-layout';
import { Icon } from 'shared/ui/icons';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { UserCard } from 'shared/ui/user-card';

import styles from './styles.module.css';

const userMock = [
  {
    avatarLink: 'https://i.pravatar.cc/300"',
    avatarName: 'Avatar',
    userId: 1,
    userName: 'Иванов Иван Иванович',
    userNumber: '+7 (111) 222-22-22',
  },
  {
    avatarLink: 'https://i.pravatar.cc/300"',
    avatarName: 'Avatar',
    userId: 2,
    userName: 'Молчанов Егор Артёмович',
    userNumber: '+7 (111) 222-22-22',
  },
  {
    avatarLink: 'https://i.pravatar.cc/300"',
    avatarName: 'Avatar',
    userId: 3,
    userName: 'Суворов Лазарь Валентинович',
    userNumber: '+7 (111) 222-22-22',
  },
  {
    avatarLink: 'https://i.pravatar.cc/300"',
    avatarName: 'Avatar',
    userId: 4,
    userName: 'Ефремов Мартын Ростиславович',
    userNumber: '+7 (111) 222-22-22',
  },
  {
    avatarLink: 'https://i.pravatar.cc/300"',
    avatarName: 'Avatar',
    userId: 5,
    userName: 'Ефремов Мартын Ростиславович',
    userNumber: '+7 (111) 222-22-22',
  },
];

export function TasksPage() {
  const [value, setValue] = useState('');

  const filter = userMock.filter((user) =>
    user.userName.toLowerCase().includes(value.toLowerCase())
  );

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
              icon={<Icon color="blue" icon="SettingsIcon" size="54" />}
              text="Создание / Редактирование заявки"
              filter={<Filter items={{ userCategories: true }} />}
            />
          }
        >
          <div>
            <Input
              value={value}
              label="Введите имя "
              name="Name"
              onChange={(e) => setValue(e.target.value)}
              extClassName={styles.input}
            />

            <ul>
              {filter.map((item) => (
                <li key={item.userId}>
                  <UserCard
                    avatarLink={item.avatarLink}
                    avatarName={item.avatarName}
                    userName={item.userName}
                    userId={item.userId}
                    userNumber={item.userNumber}
                  />
                </li>
              ))}
            </ul>
          </div>
        </ContentLayout>
      }
    />
  );
}
