import { useEffect } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { useMediaQuery } from "shared/hooks";

import { UserInfo } from "entities/user";
import { setUserRole } from "entities/user/model";
import { ContentLayout } from "shared/ui/content-layout";
import { PageLayout } from "shared/ui/page-layout";
import { SmartHeader } from "shared/ui/smart-header";
import { Icon } from "shared/ui/icons";
import { TaskList } from "entities/task/ui/task-list";
import { ButtonContainer } from "shared/ui/button-container";
import { CardButton } from "shared/ui/card-button";
import { NotFoundPage } from "pages/not-found";

import styles from "./styles.module.css";

export function RecipientPage() {
  const isMobile = useMediaQuery("(max-width:1150px)");
  const dispatch = useAppDispatch();

  const isAuth = !!(useAppSelector((store) => store.user.role));

  useEffect(() => {
    dispatch(setUserRole('recipient'));
  }, [dispatch]);

  return (
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo onClickSettingsButton={() => 1} />
          </div>
          <ButtonContainer auth={isAuth}>
            <NavLink to="active" className="link">
              {({ isActive }) => (
                <CardButton
                  customIcon={
                    <Icon color="white" icon="ActiveApplicationIcon" size="54" />
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
                    <Icon color="white" icon="CompletedApplicationIcon" size="54" />
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
                  <SmartHeader
                    filterIcon={
                      <Icon color="blue" icon="FilterIcon" size="54" />
                    }
                    filterText="Фильтр"
                    onClick={() => 1}
                    settingIcon={
                      <Icon
                        color="blue"
                        icon="ActiveApplicationIcon"
                        size="54"
                      />
                    }
                    settingText="Активные заявки"
                  />
                }
              >
                <TaskList
                  userRole="recipient"
                  isMobile={isMobile}
                  handleClickCloseButton={() => 2}
                  handleClickConfirmButton={() => 3}
                  handleClickMessageButton={() => 5}
                  handleClickPnoneButton={() => 6}
                  isStatusActive
                  tasks={[]}
                />
              </ContentLayout>
            }
          />
          <Route
            path="completed"
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
                      <Icon
                        color="blue"
                        icon="CompletedApplicationIcon"
                        size="54"
                      />
                    }
                    settingText="Завершенные заявки"
                  />
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
