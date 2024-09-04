import image from '../assets/privacy.png';
import styles from '../styles.module.css';
import { IconProps } from 'shared/ui/icons';
import { ErrorBoundaryUI } from '../ui/errorBoundary';

export const BlockedPage = () => {
  const iconConfig: IconProps = {
    color: 'blue',
    icon: 'LockIcon',
    size: '54',
  };
  const filterItemsConfig = {
    categories: true,
    radius: true,
    date: true,
  };

  return (
    <ErrorBoundaryUI
      iconConfig={iconConfig}
      headerText={'Блокировка'}
      filterItemsConfig={filterItemsConfig}
      imageSrc={image}
      imageAlt="disconnection_image"
    >
      <h3 className={styles.text_blocked}>Вы заблокированы</h3>
      <a className={styles.link} href="mailto:test@ya.ru">
        Нужно связаться с администратором
      </a>
    </ErrorBoundaryUI>
  );
};
