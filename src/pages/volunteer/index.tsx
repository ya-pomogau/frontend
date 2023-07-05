import { useEffect } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { useMediaQuery } from "shared/hooks";

import { UserInfo } from "entities/user";
import { setUserRole } from "entities/user/model";
import { ContentLayout } from "shared/ui/content-layout";
import { PageLayout } from "shared/ui/page-layout";
import { SmartHeader } from "shared/ui/smart-header";
import { YandexMap } from "shared/ui/map";
import { Icon } from "shared/ui/icons";
import { Data } from "shared/ui/map/types";
import { TaskList } from "entities/task/ui/task-list";
import { ButtonContainer } from "shared/ui/button-container";
import { CardButton } from "shared/ui/card-button";
import { NotFoundPage } from "pages/not-found";

import styles from "./styles.module.css";

const yandexMapMockData: Data[] = [
  {
    id: 0,
    recipientAdressCoordinates: [59.927, 30.308],
    isUrgentTask: true,
    avatarLink: "https://i.pravatar.cc/300",
    avatarName: "example",
    recipientName: "Иванов Иван Иванович",
    recipientPhoneNumber: "+7(000) ***-**-**",
    description:
      "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
    count: "4",
  },
  {
    id: 1,
    recipientAdressCoordinates: [59.932, 30.312],
    isUrgentTask: false,
    avatarLink: "https://i.pravatar.cc/300",
    avatarName: "example",
    recipientName: "Иванов Иван Иванович",
    recipientPhoneNumber: "+7(000) ***-**-**",
    description:
      "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
    count: "4",
  },
];

const activeTasksMockData = [
  {
    activeStatus: true,
    address: "ул. Потолочного д. 9",
    avatarLink: "https://i.pravatar.cc/300",
    avatarName: "example",
    category: "категория",
    confirmStatus: true,
    count: "3",
    date: "24.10.2022",
    description:
      "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
    recipientName: "Иванов Иван Иванович",
    recipientPhoneNumber: "+7(000) 000-00-00",
    time: "16:00",
    title: "Заголовок",
  },
  {
    activeStatus: true,
    address: "ул. Потолочного д. 9",
    avatarLink: "https://i.pravatar.cc/300",
    avatarName: "example",
    category: "категория",
    confirmStatus: false,
    count: "3",
    date: "24.10.2022",
    description:
      "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
    recipientName: "Иванов Иван Иванович",
    recipientPhoneNumber: "+7(000) 000-00-00",
    time: "16:00",
    title: "Заголовок",
  },
  {
    activeStatus: true,
    address: "ул. Потолочного д. 9",
    avatarLink: "https://i.pravatar.cc/300",
    avatarName: "example",
    category: "категория",
    confirmStatus: true,
    count: "3",
    date: "24.10.2022",
    description:
      "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
    recipientName: "Иванов Иван Иванович",
    recipientPhoneNumber: "+7(000) 000-00-00",
    time: "16:00",
    title: "Заголовок",
  },
  {
    activeStatus: true,
    address: "ул. Потолочного д. 9",
    avatarLink: "https://i.pravatar.cc/300",
    avatarName: "example",
    category: "категория",
    confirmStatus: false,
    count: "3",
    date: "24.10.2022",
    description:
      "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
    recipientName: "Иванов Иван Иванович",
    recipientPhoneNumber: "+7(000) 000-00-00",
    time: "16:00",
    title: "Заголовок",
  },
  {
    activeStatus: true,
    address: "ул. Потолочного д. 9",
    avatarLink: "https://i.pravatar.cc/300",
    avatarName: "example",
    category: "категория",
    confirmStatus: false,
    count: "3",
    date: "24.10.2022",
    description:
      "Пожалуйста, погуляйте с моей собакой, я не смогу ее выгуливать с 12.06 по 24.06 потому что уеду на обследование к врачу. Если есть желающие помочь в выгуле собаки, то звоните, 89041627779, Елена. Собаку зовут Айка, порода - немецкая овчарка, возраст - полтора года. Собака очень умная, послушная, добрая, спокойная.",
    recipientName: "Иванов Иван Иванович",
    recipientPhoneNumber: "+7(000) 000-00-00",
    time: "16:00",
    title: "Заголовок",
  },
];

export function VolunteerPage() {
  const isMobile = useMediaQuery("(max-width:1150px)");
  const dispatch = useAppDispatch();
  const isAuth = !!(useAppSelector((store) => store.user.role));

  useEffect(() => {
    dispatch(setUserRole('volunteer'));
  }, [dispatch]);

  return (
    <PageLayout
      side={
        <>
          <div className={styles.user}>
            <UserInfo onClickSettingsButton={() => 1} />
          </div>
          <ButtonContainer auth={isAuth}>
            <NavLink to="map" className="link">
              {({ isActive }) => (
                <CardButton
                  customIcon={
                    <Icon color="white" icon="MapApplicationIcon" size="54" />
                  }
                  text="Карта заявок"
                  isActive={isActive}
                />
              )}
            </NavLink>
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
          <Route index element={<Navigate to="map" replace />} />
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
                  // eslint-disable-next-line jsx-a11y/aria-role
                  role="volunteer"
                  isMobile={isMobile}
                  handleClickCloseButton={() => 2}
                  handleClickConfirmButton={() => 3}
                  handleClickMessageButton={() => 5}
                  handleClickPnoneButton={() => 6}
                  isStatusActive
                  tasks={activeTasksMockData}
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
                  // eslint-disable-next-line jsx-a11y/aria-role
                  role="volunteer"
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
          <Route
            path="map"
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
                      <Icon color="blue" icon="MapApplicationIcon" size="54" />
                    }
                    settingText="Карта заявок"
                  />
                }
              >
                <YandexMap
                  tasks={yandexMapMockData}
                  mapSettings={{ latitude: 59.93, longitude: 30.31, zoom: 15 }}
                  width="100%"
                  height="100%"
                  onClick={() => 3}
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
