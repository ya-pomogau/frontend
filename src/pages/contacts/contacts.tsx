import React, { ChangeEvent } from 'react';
import { useAppSelector } from 'app/hooks';
import classNames from 'classnames';
import { ContentLayout } from 'shared/ui/content-layout';
import { Icon } from 'shared/ui/icons';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';

import { SideMenu } from 'widgets/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';

import styles from './styles.module.css';

export function ContactsPage() {
  const focus = false;
  const { role } = useAppSelector((state) => state.user);
  const [userData, setUserData] = React.useState({
    userEmail: 'www@yandex.ru',
    userVKLink: 'https://vk.com/me2help',
  });
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
          <form className={styles.container}>
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
              <a
                href="mailto:www@yandex.ru"
                className={classNames(
                  'text',
                  'text_size_large',
                  'text_type_regular',
                  styles.link
                )}
              >
                <input
                  type="text"
                  className={styles.input}
                  onChange={onChange}
                  autoFocus={focus}
                  name="userEmail"
                  defaultValue={userData.userEmail}
                  disabled={true}
                />
              </a>
            </div>
          </form>
          <div className={styles.container}>
            <h2
              className={classNames(
                'text',
                'text_size_large',
                'text_type_regular',
                styles.title
              )}
            >
              Соцсети
            </h2>
            <a
              className={classNames(
                'text',
                'text_size_large',
                'text_type_regular',
                styles.link
              )}
              href="https://vk.com/me2help"
              target="_blank"
              rel="noreferrer"
            >
              {userData.userVKLink}
            </a>
          </div>
        </ContentLayout>
      }
    />
  );
}
