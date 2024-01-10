import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button } from 'shared/ui/button';
import {
  setAddress,
  changeStepDecrement,
  changeStepIncrement,
} from 'features/create-request/model';
import YandexMap from 'widgets/map';
import { InputAddress } from 'shared/ui/input-address';

import styles from './address-step.module.css';
import { useEffect } from 'react';

interface IAddressProps {
  isMobile?: boolean;
}

export const AddressStep = ({ isMobile }: IAddressProps) => {
  // Для получения стартового значения адреса, эта точка будет центром карты по умолчанию
  const cord = useAppSelector((store) => store.user.data?.coordinates);

  const dispatch = useAppDispatch();

  const { address, coordinates } = useAppSelector(
    (state) => state.createRequest
  );
  // Заполняем стор createRecust для отрисовки стартовой позиции баллуна при монтировании страницы
  useEffect(() => {
    // Условие нужно, чтобы сохранить промежуточный результат ввода данных при переходе на след или предудыший этап
    if (!address) {
      dispatch(setAddress({ additinalAddress: '', coords: cord }));
    }
  }, []);

  const handleAddressValueChange = (
    additinalAddress: string,
    coords?: [number, number] | []
  ) => {
    dispatch(setAddress({ additinalAddress, coords }));
  };

  const handleNextStepClick = () => {
    dispatch(changeStepIncrement());
  };

  const handlePreviousStepClick = () => {
    dispatch(changeStepDecrement());
  };

  return (
    <>
      <div className={styles.addressContainer}>
        {isMobile ? (
          <>
            <p
              className={classNames(
                'text',
                'text_type_regular ',
                'm-0',
                styles.place
              )}
            >
              Место встречи
            </p>
            <div className={styles.headerWrapper} />

            <InputAddress
              initialValue={address}
              address={{ address, coords: coordinates || [] }}
              setAddress={handleAddressValueChange}
              name="address"
              extClassName={styles.input}
            />

            <div className={styles.map}>
              <YandexMap
                width="260px"
                height="350px"
                coordinates={coordinates}
                mapSettings={
                  coordinates
                    ? {
                        latitude: coordinates[0],
                        longitude: coordinates[1],
                        zoom: 17,
                      }
                    : undefined
                }
              />
              <div className={styles.alertWrapper}>
                <p
                  className={classNames(
                    'text',
                    'text_size_small',
                    'text_type_regular ',
                    'm-0',
                    styles.text
                  )}
                >
                  * Будьте осторожны, если указываете домашний адрес,
                  <span
                    className={classNames(
                      'text',
                      'text_size_small',
                      'text_type_regular ',
                      'm-0',
                      styles.selectedText
                    )}
                  >
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
              initialValue={address}
              address={{ address, coords: coordinates || [] }}
              setAddress={handleAddressValueChange}
              name="address"
              extClassName={styles.input}
            />
            <p
              className={classNames(
                'text',
                'text_size_small',
                'text_type_regular ',
                styles.text
              )}
            >
              * Будьте осторожны, если указываете домашний
              <br />
              адрес,
              <span
                className={classNames(
                  'text',
                  'text_size_small',
                  'text_type_regular ',
                  'm-0',
                  styles.selectedText
                )}
              >
                &nbsp;не&nbsp;
              </span>
              пишите его полностью.
            </p>
            <div className={styles.map}>
              <YandexMap
                width="100%"
                height="159px"
                coordinates={coordinates}
                mapSettings={
                  coordinates
                    ? {
                        latitude: coordinates[0],
                        longitude: coordinates[1],
                        zoom: 17,
                      }
                    : undefined
                }
              />
            </div>
          </>
        )}
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          buttonType="secondary"
          label="Вернуться"
          onClick={handlePreviousStepClick}
          extClassName={styles.prevButton}
        />
        <Button
          buttonType="primary"
          label="Продолжить"
          onClick={handleNextStepClick}
        />
      </div>
    </>
  );
};
