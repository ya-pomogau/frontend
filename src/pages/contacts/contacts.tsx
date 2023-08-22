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
    <>
      <SmartHeader
        settingIcon={<Icon color="blue" icon="ContactsIcon" size="54" />}
        settingText="Контакты"
      />
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
    </>
  );
}
