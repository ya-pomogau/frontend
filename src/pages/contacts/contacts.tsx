import React, { ChangeEvent, SyntheticEvent } from 'react';
import { useAppSelector } from 'app/hooks';
import classNames from 'classnames';
import { ContentLayout } from 'shared/ui/content-layout';
import { Icon } from 'shared/ui/icons';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';

import { SideMenu } from 'widgets/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';

import styles from './styles.module.css';
import { Button } from '../../shared/ui/button';

export function ContactsPage() {
  const focus = false;
  const { role } = useAppSelector((state) => state.user);

  const roleChecker = () => {
    if (role === 'master') {
      return true;
    }
    if (role === 'admin') {
      return true;
    }
  };

  const [userData, setUserData] = React.useState({
    userEmail: 'www@yandex.ru',
    userVKLink: 'https://vk.com/me2help',
  });
  const [enableEdit, setEnableEdit] = React.useState(false);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setEnableEdit(false);
    console.log(
      `Данные ${userData.userEmail} ${userData.userVKLink} отправлены на сервер`
    );
  };
  const handleEnableEdit = () => {
    setEnableEdit(true);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <PageLayout
      side={
        <SideMenu
          authRequired={false}
          extClassName={styles.button_container}
          links={
            <>
              <SideMenuLink
                to="/contacts"
                icon={<Icon color="white" icon="ContactsIcon" size="54" />}
                text="Контакты"
              />
              <SideMenuLink
                to="/feedback"
                icon={<Icon color="white" icon="EmptyMessageIcon" size="54" />}
                text="Напишите нам"
              />
            </>
          }
        />
      }
      content={
        <ContentLayout
          heading={
            <SmartHeader
              text="Контакты"
              icon={<Icon color="blue" icon="ContactsIcon" size="54" />}
            />
          }
        >
          <form onSubmit={onSubmit}>
            <div className={styles.container}>
              <div className={styles.element_box}>
                <h2
                  className={classNames(
                    'text',
                    'text_size_large',
                    'text_type_regular',
                    styles.title
                  )}
                >
                  Эл. почта
                </h2>
                <input
                  type="text"
                  className={styles.input}
                  onChange={onChange}
                  autoFocus={!enableEdit}
                  name="userEmail"
                  defaultValue={userData.userEmail}
                  readOnly={!enableEdit}
                  onClick={(e) => {
                    if (!enableEdit) {
                      e.preventDefault();
                      window.location.href = `mailto:${userData.userEmail}`;
                    }
                  }}
                />
              </div>
              {roleChecker() && (
                <div onClick={handleEnableEdit} className={styles.edit_box}>
                  <Icon color="blue" icon="EditIcon" />
                  <p className={styles.edit_text}>Изменить данные</p>
                </div>
              )}
            </div>
            <div className={styles.container}>
              <div className={styles.element_box}>
                <h2
                  className={classNames(
                    'text',
                    'text_size_large',
                    'text_type_regular',
                    styles.title
                  )}
                >
                  Страница VK
                </h2>
                <input
                  type="text"
                  className={styles.input}
                  onChange={onChange}
                  autoFocus={focus}
                  name="userVKLink"
                  defaultValue={userData.userVKLink}
                  readOnly={!enableEdit}
                  onClick={(e) => {
                    if (!enableEdit) {
                      e.preventDefault();
                      window.location.href = `${userData.userVKLink}`;
                    }
                  }}
                />
              </div>
              {roleChecker() && (
                <div onClick={handleEnableEdit} className={styles.edit_box}>
                  <Icon color="blue" icon="EditIcon" />
                  <p className={styles.edit_text}>Изменить данные</p>
                </div>
              )}
            </div>
            {roleChecker() && (
              <Button
                buttonType="primary"
                label="Сохранить"
                disabled={!enableEdit}
                type="submit"
              />
            )}
          </form>
        </ContentLayout>
      }
    />
  );
}
