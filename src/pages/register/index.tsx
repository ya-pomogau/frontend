import { ViewerInfo } from "entities/viewer";
import { ContentLayout } from "shared/ui/content-layout";
import { PageLayout } from "shared/ui/page-layout";
import { SmartHeader } from "shared/ui/smart-header";
import { NavLink } from "react-router-dom";
import { Icon } from "shared/ui/icons";
import { ButtonContainer } from "shared/ui/button-container";
import { CardButton } from "shared/ui/card-button";
import { Input } from "shared/ui/input";
import { FormEvent, useState } from "react";
import { Button } from "shared/ui/button";
import { VkIcon } from "shared/ui/icons/vk-icon";
import styles from "./styles.module.css";

export function RegisterPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Региcтрация:", name, phone,address);
  };

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
            <form className={styles.form} onSubmit={onSubmit}>
                <p className={styles.title}>Зарегистрироваться</p>

                <Input
                    extClassName={styles.field}
                    label="ФИО"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.currentTarget.value)}
                    placeholder="ФИО"
                    type="text"
                />

                <Input
                    extClassName={styles.field}
                    label="Телефон"
                    name="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.currentTarget.value)}
                    placeholder="+7 (000) 000 00 00"
                    type="tel"
                />

                <Input
                    extClassName={styles.field}
                    label="Адрес"
                    name="address"
                    value={address}
                    onChange={(event) => setAddress(event.currentTarget.value)}
                    placeholder="ул. Нахимова, д.9, у подъезда №3"
                    type="text"
                />

                <Button
                    buttonType="primary"
                    actionType="submit"
                    customIcon={<VkIcon color="white" size="24"/>}
                    label="Зарегистрироваться через ВКонтакте"
                    size="extraLarge"
                />
            </form>
        </ContentLayout>
      }
    />
  );
}
