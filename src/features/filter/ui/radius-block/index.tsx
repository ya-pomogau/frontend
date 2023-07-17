import classnames from 'classnames';

import { Button } from 'shared/ui/button';
import { FilterItemsIds } from '../consts';

import styles from '../styles.module.css';

interface RadiusBlockProps {
  filter: string;
  onChange: (name: string, value: string[] | string) => void;
  modeOfProfile: string;
}

export const RadiusBlock = ({
  filter,
  onChange,
  modeOfProfile,
}: RadiusBlockProps) => {
  // определение внешнего вида копки радуса с учетом текущего выбора фильтра
  const getRadiusButtonType = (id: string) =>
    filter === id ? 'primary' : 'secondary';
  // изменение текущего состояния фильтра в части радиуса
  const handleRadiusButtonClick = (id: string) => {
    if (filter === id && modeOfProfile !== 'map') {
      onChange('searchRadius', '');
    } else {
      onChange('searchRadius', id);
    }
  };
  // установление изначального значения радиуса поиска активных заявок
  if (filter === '' && modeOfProfile === 'map') {
    filter = FilterItemsIds.RADIUS_5;
    setTimeout(() => {
      handleRadiusButtonClick(FilterItemsIds.RADIUS_5);
    });
  }

  return (
    <div className={styles.filterBlock}>
      <div
        className={classnames(
          styles.filterBlockTitle,
          'text',
          'text_size_small',
          'text_type_bold'
        )}
      >
        Радиус поиска
      </div>
      <div className={styles.radiusButtonsWrapper}>
        <Button
          buttonType={getRadiusButtonType(FilterItemsIds.RADIUS_1)}
          size="medium"
          label="1 км"
          extClassName={styles.radiusButton}
          id={FilterItemsIds.RADIUS_1}
          onClick={() => handleRadiusButtonClick(FilterItemsIds.RADIUS_1)}
          actionType="button"
        />
        <Button
          buttonType={getRadiusButtonType(FilterItemsIds.RADIUS_3)}
          size="medium"
          label="3 км"
          extClassName={styles.radiusButton}
          id={FilterItemsIds.RADIUS_3}
          onClick={() => handleRadiusButtonClick(FilterItemsIds.RADIUS_3)}
          actionType="button"
        />
        <Button
          buttonType={getRadiusButtonType(FilterItemsIds.RADIUS_5)}
          size="medium"
          label="5 км"
          extClassName={styles.radiusButton}
          id={FilterItemsIds.RADIUS_5}
          onClick={() => handleRadiusButtonClick(FilterItemsIds.RADIUS_5)}
          actionType="button"
        />
      </div>
    </div>
  );
};
