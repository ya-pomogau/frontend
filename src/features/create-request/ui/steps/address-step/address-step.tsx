import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button } from 'shared/ui/button';
import {
  addAddress,
  changeStepDecrement,
  changeStepIncrement,
} from 'features/create-request/model';
import { Input } from 'shared/ui/input';
import { YandexMap } from 'shared/ui/map';

import styles from './address-step.module.css';

interface IAddressProps {
  isMobile?: boolean;
}

export const AddressStep = ({ isMobile }: IAddressProps) => {
  const { address } = useAppSelector((state) => state.createRequest);
  const dispatch = useAppDispatch();

  const handleAddressValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addAddress(e.target.value));
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
                'text_size_small',
                'text_type_regular ',
                'm-0',
                styles.place
              )}
            >
              Место встречи
            </p>
            <div className={styles.headerWrapper} />
            <div className={styles.map}>
              <YandexMap width="270px" height="395px" />
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
            <Input
              label="Укажите место встречи"
              placeholder="Например: ул. Нахимова, д.9, у подъезда №3"
              value={address}
              onChange={handleAddressValueChange}
              name="address"
              extClassName={styles.input}
            />
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
            <div className={styles.map}>
              <YandexMap width="100%" height="159px" />
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
