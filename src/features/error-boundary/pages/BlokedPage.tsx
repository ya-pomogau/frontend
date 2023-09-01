import { SmartHeader } from 'shared/ui/smart-header';
import { ErrorDialog } from 'shared/ui/error-dialog';
import image from '../assets/privacy.png';
import styles from '../styles.module.css';
import { Icon } from 'shared/ui/icons';
import { Filter } from 'features/filter';

export const BlokedPage = () => {
  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="MapApplicationIcon" size="54" />}
        text="Карта заявок"
        filter={
          <Filter
            items={{
              categories: true,
              radius: true,
              date: true,
            }}
          />
        }
      />
      <div className={styles.content_box}>
        <img
          className={styles.image}
          src={image}
          alt="disconection_image"
        ></img>
        <h3 className={styles.text_bloked}>Вы заблокированы администарором</h3>
        <p className={styles.text_contact}>Для связи используйте</p>
        <a className={styles.link} href="mailto:test@ya.ru">
          test@ya.ru
        </a>
      </div>
    </>
  );
};
