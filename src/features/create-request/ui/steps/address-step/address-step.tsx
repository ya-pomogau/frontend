import classNames from 'classnames';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button } from 'shared/ui/button';
import { setAddress } from 'features/create-request/model';
import YandexMap from 'widgets/map';
import { InputAddress } from 'shared/ui/input-address';

import usePropsButtonCustom from '../useButtonPropsCustom';
import { GeoCoordinates } from 'shared/types/point-geojson.types';
import { userRole } from 'shared/types/common.types';

import styles from './address-step.module.css';
import { Typography } from 'shared/ui/typography';

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
              color={'black'}
              fontFamily={'primaryFont'}
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
                  <Typography
                    tag={'span'}
                    color={'black'}
                    fontFamily={'primaryFont'}
                    variant={'support'}
                    content={
                      '* Будьте осторожны, если указываете домашний адрес,'
                    }
                  />
                  <Typography
                    tag={'span'}
                    color={'orange'}
                    fontFamily={'primaryFont'}
                    variant={'paragraph'}
                    content={' не '}
                  />
                  <Typography
                    tag={'span'}
                    color={'black'}
                    fontFamily={'primaryFont'}
                    variant={'support'}
                    content={'пишите его полностью.'}
                  />
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
              <Typography
                tag={'span'}
                color={'black'}
                fontFamily={'primaryFont'}
                variant={'support'}
                content={'* Рекомендуем'}
              />
              <Typography
                tag={'span'}
                color={'orange'}
                fontFamily={'primaryFont'}
                variant={'paragraph'}
                content={' не '}
              />
              <Typography
                tag={'span'}
                color={'black'}
                fontFamily={'primaryFont'}
                variant={'support'}
                content={
                  'указывать полный домашний адрес с номером квартиры в целях безопасности. Достаточно улицы, номера дома и подъезда.'
                }
              />
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
        tag={'p'}
        color={'red'}
        fontFamily={'primaryFont'}
        variant={'input-title'}
        content={'Укажите место встречи'}
        extraClass={`${classNames(
          styles.messageAlert,
          isEmptyAddress ? styles.messageAlertActive : false
        )}`}
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
