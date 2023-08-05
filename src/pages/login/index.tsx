import { FormEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { UserInfo } from 'entities/user';
import { ContentLayout } from 'shared/ui/content-layout';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { ButtonContainer } from 'shared/ui/button-container';
import { CardButton } from 'shared/ui/card-button';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';

import styles from './styles.module.css';
import Checkbox from 'shared/ui/checkbox';
import { PasswordInput } from 'shared/ui/password-input';

export function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [checkState, setCheckState] = useState(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckState(!checkState);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PageLayout
      side={
        <>
          <div className={styles.viewer}>
            <UserInfo />
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
        <ContentLayout
          heading={
            <SmartHeader
              settingIcon={<Icon color="blue" icon="LoginIcon" size="54" />}
              settingText="Вход"
              extClassName={styles.header}
            />
          }
        >
          <p className={styles.title}>Войти</p>
          <div className={styles.info}>
            <Button
              buttonType="primary"
              actionType="button"
              customIcon={<VkIcon color="white" size="24" />}
              label="Войти через ВКонтакте"
              size="extraLarge"
            />
            <Checkbox
              label="Войти как администратор"
              id={'adminLogin'}
              onChange={handleCheck}
              extClassName={styles.label}
            />
          </div>
          {checkState && (
            <form className={styles.form} onSubmit={onSubmit}>
              <Input
                extClassName={styles.field}
                required
                label="Логин"
                name="login"
                value={login}
                onChange={(event) => setLogin(event.currentTarget.value)}
                placeholder="ФИО / Телефон / Логин"
                type="text"
                error={false}
                errorText={'Вы ввели неправильный логин'}
              />

              <PasswordInput
                extClassName={styles.field}
                required
                label={'Пароль'}
                name="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                placeholder="от 6 символов"
                type="password"
              />
              <Button
                buttonType="primary"
                actionType="submit"
                label="Войти"
                size="medium"
                extClassName={styles.button}
                disabled={!login || !password}
              />
            </form>
          )}
        </ContentLayout>
      }
    />
  );
}
