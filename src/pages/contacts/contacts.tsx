import classNames from 'classnames';

import { ContentLayout } from 'shared/ui/content-layout';
import { Icon } from 'shared/ui/icons';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';

import { SideMenu } from 'widgets/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';

import styles from './styles.module.css';

export function ContactsPage() {
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
          <div className={styles.container}>
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
              www@yandex.ru
            </a>
          </div>
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
              https://vk.com/me2help
            </a>
          </div>
        </ContentLayout>
      }
    />
  );
}
