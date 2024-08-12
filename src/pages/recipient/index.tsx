// !!!

// НЕ ИСПОЛЬЗОВАТЬ СТРАНИЦУ В РОУТИНГЕ
// СТРАНИЦА НУЖНА ЧТОБЫ ПЕРЕДЕЛАТЬ КОМПОНЕНТЫ (TaskList, Filter) НА СТРАНИЦЕ profile/active и profile/completed С УЧЕТОМ РОЛЕЙ

// !!!

import { useState, useRef, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useMediaQuery } from 'shared/hooks';

import { setUserRole } from 'entities/user/model';
import { ContentLayout } from 'shared/ui/content-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { TaskList } from 'entities/task/ui/task-list';

import { Request } from 'features/create-request';
import { openPopup } from 'features/create-request/model';
import { NotFoundPage } from 'pages/not-found';
import { Breakpoints } from 'shared/config';

import { UserRole } from 'shared/types/common.types';

export function RecipientPage() {
  const isMobile = useMediaQuery(Breakpoints.IS_MOBILE_1150);
  const isMobileForPopup = useMediaQuery(Breakpoints.IS_MOBILE_POPUP);

  const dispatch = useAppDispatch();
  const buttonFilterRef = useRef<Element>();
  // данные о позиции кнопки вызова фильтра, на основе которых определяется позиция фильтра
  const [_, setButtonPosition] = useState({ top: 0, right: 0 });
  // открытие фильтра и определение данных о позиции кнопки, вызвавшей фильтр
  const getButtonPosition = () => {
    const buttonRect = buttonFilterRef.current?.getBoundingClientRect();
    if (buttonRect) {
      setButtonPosition({ top: buttonRect.bottom, right: buttonRect.right });
    }
  };
  const { isPopupOpen } = useAppSelector((store) => store.createRequest);

  useEffect(() => {
    dispatch(setUserRole(UserRole.RECIPIENT));
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
                userRole={UserRole.RECIPIENT}
                isMobile={isMobile}
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
                userRole={UserRole.RECIPIENT}
                isMobile={isMobile}
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
