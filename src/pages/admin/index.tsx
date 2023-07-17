import { useState, MouseEvent, useRef, useEffect } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import classnames from 'classnames';

import { Filter } from 'features/filter/ui';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setUserRole } from 'entities/user/model';
import { PageLayout } from '../../shared/ui/page-layout';
import { UserInfo } from '../../entities/user';
import { ButtonContainer } from '../../shared/ui/button-container';
import { CardButton } from '../../shared/ui/card-button';
import { Icon } from '../../shared/ui/icons';
import { ContentLayout } from '../../shared/ui/content-layout';
import { SmartHeader } from '../../shared/ui/smart-header';
import { Input } from '../../shared/ui/input';
import { UserCard } from '../../shared/ui/user-card';
import { NotFoundPage } from '../not-found';

import styles from './styles.module.css';

const numbersMock = {
  numberVolunteer: 2,
  numberRecipient: 3,
  numberNotProcessed: 43,
};

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
export function AdminPage() {
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
  const isAuth = !!useAppSelector((store) => store.user.role);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserRole('admin'));
  }, [dispatch]);

  return (
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>
          <ButtonContainer auth={isAuth}>
            <NavLink to="requests" className="link">
              {({ isActive }) => (
                <CardButton
                  customIcon={<Icon color="white" icon="BlockIcon" size="54" />}
                  text="Подтверждение /Блокировка"
                  isActive={isActive}
                />
              )}
            </NavLink>
            <NavLink to="statistics" className="link">
              {({ isActive }) => (
                <CardButton
                  customIcon={
                    <Icon color="white" icon="StatisticIcon" size="54" />
                  }
                  text="Статистика"
                  isActive={isActive}
                />
              )}
            </NavLink>
            <NavLink to="tasks" className="link">
              {({ isActive }) => (
                <CardButton
                  customIcon={
                    <Icon color="white" icon="CreateApplication" size="54" />
                  }
                  text="Создание / Редактирование заявки"
                  isActive={isActive}
                />
              )}
            </NavLink>
          </ButtonContainer>
        </>
      }
      content={
        <Routes>
          <Route index element={<Navigate to="requests" replace />} />
          <Route
            path="requests"
            element={
              <ContentLayout
                heading={
                  <>
                    <SmartHeader
                      filterIcon={
                        <Icon color="blue" icon="FilterIcon" size="54" />
                      }
                      filterText="Фильтр"
                      onClick={openFilter}
                      settingIcon={
                        <Icon color="blue" icon="BlockIcon" size="54" />
                      }
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
                <div className={styles.tabContainer}>
                  <NavLink to="volunteer" className="link">
                    {({ isActive }) => (
                      <div
                        className={classnames(
                          isActive ? styles.tabContainer__itemActive : '',
                          styles.tabContainer__item
                        )}
                      >
                        {' '}
                        <p
                          className={classnames(
                            isActive ? styles.tabContainer__textActive : '',
                            'text',
                            'p-0',
                            'm-0',
                            styles.tabContainer__text
                          )}
                        >
                          Волонтеры
                        </p>
                        <span className={styles.tabContainer__number}>
                          {numbersMock.numberVolunteer}
                        </span>{' '}
                      </div>
                    )}
                  </NavLink>
                  <NavLink to="recipients" className="link">
                    {({ isActive }) => (
                      <div
                        className={classnames(
                          isActive ? styles.tabContainer__itemActive : '',
                          styles.tabContainer__item
                        )}
                      >
                        {' '}
                        <p
                          className={classnames(
                            isActive ? styles.tabContainer__textActive : '',
                            'text',
                            'p-0',
                            'm-0',
                            styles.tabContainer__text
                          )}
                        >
                          Реципиенты
                        </p>
                        <span className={styles.tabContainer__number}>
                          {numbersMock.numberRecipient}
                        </span>{' '}
                      </div>
                    )}
                  </NavLink>
                  <NavLink to="notprocessed" className="link">
                    {({ isActive }) => (
                      <div
                        className={classnames(
                          isActive ? styles.tabContainer__itemActive : '',
                          styles.tabContainer__item
                        )}
                      >
                        {' '}
                        <p
                          className={classnames(
                            isActive ? styles.tabContainer__textActive : '',
                            'text',
                            'p-0',
                            'm-0',
                            styles.tabContainer__text
                          )}
                        >
                          Не обработанные
                        </p>
                        <span className={styles.tabContainer__number}>
                          {numbersMock.numberNotProcessed}
                        </span>{' '}
                      </div>
                    )}
                  </NavLink>
                </div>
              </ContentLayout>
            }
          />
          <Route
            path="statistics"
            element={
              <ContentLayout
                heading={
                  <SmartHeader
                    filterIcon={
                      <Icon color="blue" icon="FilterIcon" size="54" />
                    }
                    filterText="Фильтр"
                    onClick={() => 1}
                    settingIcon={
                      <Icon color="blue" icon="StatisticIcon" size="54" />
                    }
                    settingText="Статистика"
                  />
                }
              >
                <div> Statistics </div>
              </ContentLayout>
            }
          />
          <Route
            path="tasks"
            element={
              <ContentLayout
                heading={
                  <>
                    <SmartHeader
                      filterIcon={
                        <Icon color="blue" icon="FilterIcon" size="54" />
                      }
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
                        {' '}
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
    />
  );
}
