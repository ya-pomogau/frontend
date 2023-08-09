import { useState, MouseEvent, useRef, useEffect } from 'react';

import { SideMenuForAuthorized } from 'widgets/side-menu';
import { Filter } from 'features/filter/ui';
import { UserInfo } from 'entities/user';
import { PageLayout } from 'shared/ui/page-layout';
import { Icon } from 'shared/ui/icons';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { UserCard } from 'shared/ui/user-card';

import styles from './styles.module.css';
import { Link } from 'react-router-dom';

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

  const [isFilterVisibel, setIsFilterVisibel] = useState(false);

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
            <>
              <SmartHeader
                filterIcon={<Icon color="blue" icon="FilterIcon" size="54" />}
                filterText="Фильтр"
                onClick={openFilter}
                settingIcon={
                  <Icon color="blue" icon="SettingsIcon" size="54" />
                }
                settingText="Создание / Редактирование заявки"
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
          <div>
            <Link to={'/profile/bids'}>Настроить баллы</Link>
          </div>

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
