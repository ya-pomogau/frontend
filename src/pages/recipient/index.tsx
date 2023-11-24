// !!!

// НЕ ИСПОЛЬЗОВАТЬ СТРАНИЦУ В РОУТИНГЕ
// СТРАНИЦА НУЖНА ЧТОБЫ ПЕРЕДЕЛАТЬ КОМПОНЕНТЫ (TaskList, Filter) НА СТРАНИЦЕ profile/active и profile/completed С УЧЕТОМ РОЛЕЙ

// !!!

import { useState, MouseEvent, useRef, useEffect } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useMediaQuery } from 'shared/hooks';

import { setUserRole } from 'entities/user/model';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { TaskList } from 'entities/task/ui/task-list';
import { SideMenuContainer } from 'entities/side-menu-container';
import { CardButton } from 'shared/ui/card-button';

import { Request } from 'features/create-request';
import { openPopup } from 'features/create-request/model';
import { NotFoundPage } from 'pages/not-found';

import styles from './styles.module.css';
import useUser from 'shared/hooks/use-user';

export function RecipientPage() {
  const isMobile = useMediaQuery('(max-width:1150px)');
  const isMobileForPopup = useMediaQuery('(max-width:735px)');

  const dispatch = useAppDispatch();

  const isAuth = useUser();
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
  //ниже закомментирован код, который более не используется.
  //Компонент PageLayout больше не использует пропсы side и extraClass
  return (
    <>
      {/* <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo />
          </div>

          <SideMenuContainer overlayVisible={isAuth}>
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
          </SideMenuContainer>
        </>
      }
      content={ */}
      <Routes>
        <Route index element={<Navigate to="active" replace />} />
        <Route
          path="active"
          element={
            <ContentLayout
              heading={
                <>
                  <SmartHeader
                    // filterIcon={
                    //   <Icon color="blue" icon="FilterIcon" size="54" />
                    // }
                    // filterText="Фильтр"
                    // onClick={openFilter}
                    icon={
                      <Icon
                        color="blue"
                        icon="ActiveApplicationIcon"
                        size="54"
                      />
                    }
                    text="Активные заявки"
                  />
                  {/* {isFilterVisibel && (
                      <Filter
                        userRole="recipient"
                        changeVisible={() => setIsFilterVisibel(false)}
                        position={buttonPosition}
                      />
                    )} */}
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
                isLoading={false}
              />
              {isPopupOpen && <Request isMobile={isMobileForPopup} />}
            </ContentLayout>
          }
        />
        <Route
          path="completed"
          element={
            <>
              <SmartHeader
                // filterIcon={
                //   <Icon color="blue" icon="FilterIcon" size="54" />
                // }
                // filterText="Фильтр"
                // onClick={openFilter}
                icon={
                  <Icon
                    color="blue"
                    icon="CompletedApplicationIcon"
                    size="54"
                  />
                }
                text="Завершенные заявки"
              />
              {/* {isFilterVisibel && (
                      <Filter
                        userRole="recipient"
                        changeVisible={() => setIsFilterVisibel(false)}
                        position={buttonPosition}
                      />
                    )} */}
              <TaskList
                userRole="recipient"
                isMobile={isMobile}
                handleClickCloseButton={() => 2}
                handleClickConfirmButton={() => 3}
                handleClickMessageButton={() => 5}
                handleClickPnoneButton={() => 6}
                isStatusActive={false}
                tasks={[]}
                isLoading={false}
              />
            </>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/*  }
     />*/}
    </>
  );
}
