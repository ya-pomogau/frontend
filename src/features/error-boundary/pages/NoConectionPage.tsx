import { SmartHeader } from 'shared/ui/smart-header';
import image from '../assets/no-conection.png';
import styles from '../styles.module.css';
import { Icon } from 'shared/ui/icons';
import { Filter } from 'features/filter';
import { useState } from 'react';
import { IFilterValues } from '../../filter/types';

export const NoConectionPage = () => {
  const [filterData, setFilterData] = useState<Partial<IFilterValues>>({
    sortBy: '',
    date: '',
    searchRadius: '',
  });

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="MapApplicationIcon" size="54" />}
        text="Карта заявок"
        filter={<Filter items={filterData} setFilterData={setFilterData} />}
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
