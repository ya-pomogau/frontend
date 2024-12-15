import styles from './info-container-content.module.css';
import { Typography } from '../../ui';

interface InfoContainerContentProps {
  name?: string;
  id?: string;
  phone?: string;
  address?: string;
}

export const InfoContainerContent = ({
  name,
  id,
  phone,
  address,
}: InfoContainerContentProps) => (
  <>
    <div className={styles['info-top-wrapper']}>
      <Typography
        color={'primary'}
        content={name}
      />
      <Typography
        color={'ID-text'}
        variant={'support'}
        content={`ID ${id}`}
      />
    </div>
    <div className={styles['info-address-wrapper']}>
      <div className={styles['info-address-container']}>
        <Typography
          tag={'span'}
          color={'primary'}
          variant={'support-bold'}
          content={'Тел.: '}
          extraClass={styles['info-field-title']}
        />
        <Typography
          tag={'span'}
          color={'primary'}
          variant={'support'}
          content={phone}
        />
      </div>
      <div className={styles['info-address-container']}>
        <Typography
          tag={'span'}
          color={'primary'}
          variant={'support-bold'}
          content={'Адрес: '}
          extraClass={styles['info-field-title']}
        />
        <Typography
          tag={'span'}
          color={'primary'}
          variant={'support'}
          content={address}
        />
      </div>
    </div>
  </>
);
