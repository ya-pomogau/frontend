import { Typography } from '../../ui';

import styles from './info-container-content.module.css';

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
      <Typography color="primary" content={name} />
      <Typography color="ID-text" variant="support" content={`ID ${id}`} />
    </div>
    <div className={styles['info-address-container']}>
      <Typography
        tag="span"
        color="primary"
        variant="support-bold"
        content="Тел.:"
      />
      <Typography
        tag="span"
        color="primary"
        variant="servicesText"
        content={phone}
      />
      <Typography
        tag="span"
        color="primary"
        variant="support-bold"
        content="Адрес:"
      />
      <Typography
        tag="span"
        color="primary"
        variant="servicesText"
        content={address}
      />
    </div>
  </>
);
