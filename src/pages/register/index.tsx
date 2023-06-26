import { ViewerInfo } from "entities/viewer";
import { ContentLayout } from "shared/ui/content-layout";
import { PageLayout } from "shared/ui/page-layout";
import { SmartHeader } from "shared/ui/smart-header";
import { NavLink } from "react-router-dom";
import { Icon } from "shared/ui/icons";
import { useMediaQuery } from "shared/hooks";
import { ButtonContainer } from "shared/ui/button-container";
import { CardButton } from "shared/ui/card-button";
import styles from "./styles.module.css";

export function RegisterPage() {
  const isMobile = useMediaQuery("(max-width:1150px)");

  return (
    <PageLayout
      side={
        <>
          <div className={styles.viewer}>
            <ViewerInfo onClickSettingsButton={() => 1} />
          </div>
          <ButtonContainer>
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
        <ContentLayout
                heading={
                  <SmartHeader
                    settingIcon={
                      <Icon color="blue" icon="RegistrationIcon" size="54" />
                    }
                    settingText="Регистрация"
                    extClassName={styles.header}
                  />
                }
              >
                lkfjkgkjtkgktgt
              </ContentLayout>
      }
    />
  );
}
