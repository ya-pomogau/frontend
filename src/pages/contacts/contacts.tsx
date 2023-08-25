import classNames from 'classnames';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';

import styles from './styles.module.css';

export function ContactsPage() {
  return (
    <>
      <SmartHeader
        text="Контакты"
        icon={<Icon color="blue" icon="ContactsIcon" size="54" />}
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
