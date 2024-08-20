import { SmartHeader } from 'shared/ui/smart-header';
import image from '../assets/no-conection.png';
import styles from '../styles.module.css';
import { Icon } from 'shared/ui/icons';
import { Filter } from 'features/filter';

export const NoConectionPage = () => {
  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="MapApplicationIcon" size="54" />}
        text="Карта заявок"
        filter={
          <Filter
            items={{
              categories: true,
              searchRadius: true,
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
      </div>
    </>
  );
};
