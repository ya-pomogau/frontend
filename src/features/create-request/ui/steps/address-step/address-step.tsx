import classNames from 'classnames';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button, Typography, InputAddress } from 'shared/ui';
import { setAddress } from 'features/create-request/model';
import YandexMap from 'widgets/map';

import usePropsButtonCustom from '../useButtonPropsCustom';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { userRole } from 'shared/types/common.types';

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
            <Typography
              tag={'h2'}
              variant={'title'}
              content={'Место встречи'}
            />
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
                role={userRole.RECIPIENT}
                mapSettings={mapSettings}
              />
              <div className={styles.alertWrapper}>
                <div className={styles.text}>
                  <Typography variant={'support'}>
                    * Будьте осторожны, если указываете домашний адрес,
                    <Typography
                      tag={'span'}
                      color={'orange'}
                      content={' не '}
                    />
                    пишите его полностью.
                  </Typography>
                </div>
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
            <div className={styles.text}>
              <Typography variant={'support'}>
                * Рекомендуем
                <Typography tag={'span'} color={'orange'} content={' не '} />
                указывать полный домашний адрес с номером квартиры в целях
                безопасности. Достаточно улицы, номера дома и подъезда.
              </Typography>
            </div>
            <div className={styles.map}>
              <YandexMap
                width="100%"
                height="159px"
                coordinates={location}
                role={userRole.RECIPIENT}
                mapSettings={mapSettings}
              />
            </div>
          </>
        )}
      </div>
      <Typography
        color={'red'}
        variant={'input-title'}
        content={'Укажите место встречи'}
        extraClass={classNames(styles.messageAlert, {
          [styles.messageAlertActive]: isEmptyAddress,
        })}
      />
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
  );
};
