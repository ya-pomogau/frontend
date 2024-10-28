import image from '../assets/privacy.png';
import styles from '../styles.module.css';
import { IconProps } from 'shared/ui/icons';
import { ErrorBoundaryUI } from '../ui/errorBoundary';
import { Typography } from 'shared/ui/typography';

export const BlockedPage = () => {
  const iconConfig: IconProps = {
    color: 'blue',
    icon: 'LockIcon',
    size: '54',
  };

  return (
    <ErrorBoundaryUI
      iconConfig={iconConfig}
      headerText={'Блокировка'}
      imageSrc={image}
      imageAlt="disconnection_image"
    >
      <Typography
        tag={'h3'}
        color={'primary-additional'}
        fontFamily={'secondaryFont'}
        variant={'title'}
        content={'Вы заблокированы'}
        extraClass={styles.text_blocked}
      />
      <a href="mailto:test@ya.ru">
        <Typography
          tag={'span'}
          color={'primary'}
          fontFamily={'secondaryFont'}
          variant={'title'}
          content={'Нужно связаться с администратором'}
        />
      </a>
    </ErrorBoundaryUI>
  );
};
