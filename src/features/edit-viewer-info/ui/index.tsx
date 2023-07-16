import React from 'react';
import classnames from 'classnames';

import { Avatar } from '../../../shared/ui/avatar';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';

import styles from './styles.module.css';

interface EditViewerInfoProps {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  handlerAvatar: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSave: () => void;
  onClickExit: () => void;
  valueName: string;
  valuePhone: string;
  valueAddress: string;
}

export const EditViewerInfo = ({
  extClassName,
  avatarLink,
  avatarName,
  handlerAvatar,
  onClickSave,
  onClickExit,
  valueName,
  valuePhone,
  valueAddress,
  ...props
}: EditViewerInfoProps) => (
  <div className={classnames(styles.editViewerInfo__container, extClassName)}>
    <div className={styles.containerInfo}>
      <div className={styles.avatarBlock}>
        <Avatar
          extClassName={styles.avatar}
          avatarLink={avatarLink}
          avatarName={avatarName}
        />
        <button
          onClick={handlerAvatar}
          className={classnames(
            styles.avatarBlock__button,
            'text',
            'text_size_small'
          )}
          type="button"
        >
          Изменить фото
        </button>
      </div>
      <ul className={classnames(styles.infoBlock, 'list')}>
        <li className={styles.infoBlock__item}>
          <p
            className={classnames(
              styles.infoBlock__text,
              'text',
              'text_size_small',
              'm-0',
              'p-0',
              'text_type_bold'
            )}
          >
            {' '}
            Имя:{' '}
          </p>
          <Input
            type="text"
            extClassName={styles.input}
            placeholder="Введите имя"
            value={valueName}
            name="name"
            {...props}
          />
        </li>
        <li className={styles.infoBlock__item}>
          <p
            className={classnames(
              styles.infoBlock__text,
              'text',
              'text_size_small',
              'm-0',
              'p-0',
              'text_type_bold'
            )}
          >
            {' '}
            Тел.:{' '}
          </p>
          <Input
            type="text"
            extClassName={styles.input}
            placeholder="Введите телефон"
            value={valuePhone}
            name="phone"
            {...props}
          />
        </li>
        <li className={styles.infoBlock__item}>
          <p
            className={classnames(
              styles.infoBlock__text,
              'text',
              'text_size_small',
              'm-0',
              'p-0',
              'text_type_bold'
            )}
          >
            {' '}
            Адрес:{' '}
          </p>
          <Input
            type="text"
            extClassName={styles.input}
            placeholder="Введите адрес"
            value={valueAddress}
            name="address"
            {...props}
          />
        </li>
      </ul>
    </div>
    <Button
      onClick={onClickSave}
      extClassName={styles.button}
      buttonType="primary"
      label="Сохранить"
      size="medium"
    />
    <Button
      onClick={onClickExit}
      extClassName={styles.button}
      buttonType="secondary"
      label="Выход"
      size="medium"
    />
  </div>
);
