import classNames from 'classnames';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button } from 'shared/ui/button';
import { setAddress } from 'features/create-request/model';
import YandexMap from 'widgets/map';
import { InputAddress } from 'shared/ui/input-address';

import usePropsButtonCustom from '../useButtonPropsCustom';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { UserRole } from 'shared/types/common.types';

import styles from './address-step.module.css';

interface IAddressProps {
  isMobile?: boolean;
}

export const AddressStep = ({ isMobile }: IAddressProps) => {
  const dispatch = useAppDispatch();

  const coord = useAppSelector((store) => store.user.data?.location);
  const { address, location, isTypeEdit } = useAppSelector(
    (state) => state.createRequest
  );

  useEffect(() => {
    if (!address) {
      dispatch(setAddress({ additinalAddress: '', coords: coord }));
    }
  }, []);

  const handleAddressValueChange = (
    additinalAddress: string,
    coords?: GeoCoordinates
  ) => {
    dispatch(setAddress({ additinalAddress, coords }));
  };

  const isEmptyAddress = address === '';

  const propsButton = usePropsButtonCustom();

  const placeTitleStyles = classNames(
    'text',
    'text_type_regular ',
    'm-0',
    styles.place
  );

  const warningTextStyles = 'text text_size_small text_type_regular m-0';

  const mapSettings = location
    ? {
        latitude: location[0],
        longitude: location[1],
        zoom: 17,
      }
    : undefined;

    return (
      <>
        <div className={styles.addressContainer}>
          {isMobile ? (
            <>
              <p className={placeTitleStyles}>Место встречи</p>
              <div className={styles.headerWrapper} />
              <InputAddress
                address={{ address, coords: location || [] }}
                setAddress={handleAddressValueChange}
                name="address"
                extClassName={styles.input}
              />
    
              <div className={styles.map}>
                <YandexMap
                  width="260px"
                  height="350px"
                  coordinates={location}
                  role={UserRole.RECIPIENT}
                  mapSettings={mapSettings}
                />
                <div className={styles.alertWrapper}>
                  <p className={`${warningTextStyles} ${styles.text}`}>
                    * Будьте осторожны, если указываете
                    <br />
                    домашний адрес,
                    <span className={`${warningTextStyles} ${styles.selectedText}`}>
                      &nbsp;не&nbsp;
                    </span>
                    пишите его полностью.
                  </p>
                </div>
                <div className={styles.wrapperForGradient} />
              </div>
            </>
          ) : (
            <>
              <InputAddress
                label="Укажите место встречи"
                address={{ address, coords: location || [] }}
                setAddress={handleAddressValueChange}
                name="address"
                extClassName={styles.input}
              />
              <p className={`${warningTextStyles} ${styles.text}`}>
                * Рекомендуем
                <span className={`${warningTextStyles} ${styles.selectedText}`}>
                  &nbsp;не&nbsp;
                </span>
                указывать полный домашний адрес с номером квартиры
                <br />
                в целях безопасности. Достаточно улицы, номера дома и подъезда.
              </p>
              <div className={styles.map}>
                <YandexMap
                  width="100%"
                  height="159px"
                  coordinates={location}
                  role={UserRole.RECIPIENT}
                  mapSettings={mapSettings}
                />
              </div>
            </>
          )}
        </div>
        <p className={classNames(styles.messageAlert, isEmptyAddress && styles.messageAlertActive)}>Укажите место встречи</p>
        <div className={styles.buttonWrapper}>
          {!isTypeEdit && (
            <Button
              buttonType="secondary"
              label={propsButton.backlabel}
              onClick={propsButton.backonClick}
              extClassName={styles.prevButton}
            />
          )}
          <Button
            disabled={isEmptyAddress}
            buttonType="primary"
            label={propsButton.label}
            onClick={propsButton.onClick}
          />
        </div>
      </>
    ); }    