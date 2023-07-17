import { useState, MouseEvent, useRef, useEffect } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useMediaQuery } from 'shared/hooks';

import { UserInfo } from 'entities/user';
import { setUserRole } from 'entities/user/model';
import { ContentLayout } from 'shared/ui/content-layout';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { TaskList } from 'entities/task/ui/task-list';
import { ButtonContainer } from 'shared/ui/button-container';
import { CardButton } from 'shared/ui/card-button';
import { Filter } from 'features/filter/ui';
import { Request } from 'features/create-request';
import { openPopup } from 'features/create-request/model';
import { NotFoundPage } from 'pages/not-found';

import styles from './styles.module.css';

export function RecipientPage() {
  const isMobile = useMediaQuery('(max-width:1150px)');
  const isMobileForPopup = useMediaQuery('(max-width:735px)');

  const dispatch = useAppDispatch();

  const isAuth = !!useAppSelector((store) => store.user.role);
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
  const { isPopupOpen } = useAppSelector((store) => store.createRequest);

  useEffect(() => {
    dispatch(setUserRole('recipient'));
    window.addEventListener('resize', getButtonPosition);
    return () => {
      window.removeEventListener('resize', getButtonPosition);
    };
  }, [dispatch]);

  return (
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>
          <ButtonContainer auth={isAuth}>
            <NavLink to="active" className="link">
              {({ isActive }) => (
                <CardButton
                  customIcon={
                    <Icon
                      color="white"
                      icon="ActiveApplicationIcon"
                      size="54"
                    />
                  }
                  text="Активные заяки"
                  isActive={isActive}
                />
              )}
            </NavLink>
            <NavLink to="completed" className="link">
              {({ isActive }) => (
                <CardButton
                  customIcon={
                    <Icon
                      color="white"
                      icon="CompletedApplicationIcon"
                      size="54"
                    />
                  }
                  text="Завершенные заявки"
                  isActive={isActive}
                />
              )}
            </NavLink>
          </ButtonContainer>
        </>
      }
      content={
        <Routes>
          <Route index element={<Navigate to="active" replace />} />
          <Route
            path="active"
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
                        <Icon
                          color="blue"
                          icon="ActiveApplicationIcon"
                          size="54"
                        />
                      }
                      settingText="Активные заявки"
                    />
                    {isFilterVisibel && (
                      <Filter
                        userRole="recipient"
                        changeVisible={() => setIsFilterVisibel(false)}
                        position={buttonPosition}
                      />
                    )}
                  </>
                }
              >
                <TaskList
                  userRole="recipient"
                  isMobile={isMobile}
                  handleClickCloseButton={() => 2}
                  handleClickConfirmButton={() => 3}
                  handleClickMessageButton={() => 5}
                  handleClickPnoneButton={() => 6}
                  handleClickAddTaskButton={() => dispatch(openPopup())}
                  isStatusActive
                  tasks={[]}
                />
                {isPopupOpen && <Request isMobile={isMobileForPopup} />}
              </ContentLayout>
            }
          />
          <Route
            path="completed"
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
                        <Icon
                          color="blue"
                          icon="CompletedApplicationIcon"
                          size="54"
                        />
                      }
                      settingText="Завершенные заявки"
                    />
                    {isFilterVisibel && (
                      <Filter
                        userRole="recipient"
                        changeVisible={() => setIsFilterVisibel(false)}
                        position={buttonPosition}
                      />
                    )}
                  </>
                }
              >
                <TaskList
                  userRole="recipient"
                  isMobile={isMobile}
                  handleClickCloseButton={() => 2}
                  handleClickConfirmButton={() => 3}
                  handleClickMessageButton={() => 5}
                  handleClickPnoneButton={() => 6}
                  isStatusActive={false}
                  tasks={[]}
                />
              </ContentLayout>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
    />
  );
}
