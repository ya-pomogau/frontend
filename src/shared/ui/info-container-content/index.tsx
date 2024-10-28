import styles from './info-container-content.module.css';
import { Typography } from '../typography';

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
    <Typography
      tag={'p'}
      color={'primary'}
      fontFamily={'primaryFont'}
      variant={'paragraph'}
      content={name}
      extraClass={styles['info-name-wrapper']}
    />
    <Typography
      tag={'p'}
      color={'ID-text'}
      fontFamily={'primaryFont'}
      variant={'support'}
      content={`ID ${id}`}
      extraClass={styles['info-id-wrapper']}
    />
    <div className={styles['info-address-container']}>
      <Typography
        tag={'span'}
        color={'primary'}
        fontFamily={'primaryFont'}
        variant={'support-bold'}
        content={'Тел.: '}
        extraClass={styles['info-field-title']}
      />
      <Typography
        tag={'span'}
        color={'primary'}
        fontFamily={'primaryFont'}
        variant={'support'}
        content={phone}
        extraClass={styles['info-phone-wrapper']}
      />
    </div>
    <div className={styles['info-address-container']}>
      <Typography
        tag={'span'}
        color={'primary'}
        fontFamily={'primaryFont'}
        variant={'support-bold'}
        content={'Адрес: '}
        extraClass={styles['info-field-title']}
      />
      <Typography
        tag={'span'}
        color={'primary'}
        fontFamily={'primaryFont'}
        variant={'support'}
        content={address}
        extraClass={styles['info-address-wrapper']}
      />
    </div>
  </>
);
