import { useState, useRef } from 'react';
import classnames from 'classnames';

import { Avatar } from '../../../shared/ui/avatar';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';

import styles from './light-popup.module.css';
import { UpdateUserInfo } from 'entities/user/types';
import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { useMediaQuery } from 'shared/hooks';
import { ViewerInputData } from './types';

interface LightPopupProps {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  handlerAvatar: () => void;
  onClickSave: (values: UpdateUserInfo) => void;
  onClickExit: () => void;
  valueName: string;
  valuePhone: string;
  valueAddress: string;
  valueId: number;
}

export const LightPopup = ({
  extClassName,
  avatarLink,
  avatarName,
  handlerAvatar,
  onClickSave,
  onClickExit,
  valueName,
  valuePhone,
  valueAddress,
  valueId,
  ...props
}: LightPopupProps) => {
  const avatarPicker = useRef<HTMLInputElement>(null);

  const viewerData: UpdateUserInfo = {
    fullname: valueName,
    phone: valuePhone,
    address: valueAddress,
    avatar: null,
    id: valueId,
  };

  const [values, setValues] = useState(viewerData);

  const handleChange = (event: ViewerInputData) => {
    const { value, name, files } = event.target;

    if (files) {
      const formData = new FormData();
      formData.append('file', files[0]);
      setValues({ ...values, avatar: formData });
      // Работает но возникает ошибка 404. Предположительно функцианирует
      // uploadAvatar(viewerData.id, formData);
    }
    setValues({ ...values, [name]: value });
  };

  const handlePick = () => {
    if (avatarPicker.current) {
      avatarPicker.current.click();
    }
  };

  const isMobileForPopup = useMediaQuery('(max-width:735px)');

  return (
    <div className={classnames(styles.container, extClassName)}>
      <div className={styles.containerInfo}>
        <div className={styles.headerElements}>
          <div className={styles.avatarBlock}>
            <Avatar
              extClassName={styles.avatar}
              avatarLink={avatarLink}
              avatarName={avatarName}
            />
            <button
              onClick={handlePick}
              className={classnames(
                styles.avatarBlock__button,
                'text',
                'text_size_small'
              )}
              type="button"
            >
              Изменить фото
            </button>
            <input
              onChange={handleChange}
              className={classnames(
                styles.avatarBlock__hidden,
                'text',
                'text_size_small'
              )}
              placeholder="Изменить фото"
              type="file"
              name="avatar"
              accept="image/*,.png,.jpg,.gif,.web,"
              ref={avatarPicker}
            />
          </div>
          {!isMobileForPopup ? (
            <CloseCrossIcon
              className={styles.closeIcon}
              size="14"
              color="blue"
              onClick={onClickExit}
            />
          ) : null}
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
              value={values.fullname}
              onChange={handleChange}
              name="fullname"
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
              value={values.phone}
              onChange={handleChange}
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
              value={values.address}
              onChange={handleChange}
              name="address"
              {...props}
            />
          </li>
        </ul>
      </div>
      <Button
        onClick={() => onClickSave(values)}
        extClassName={styles.button}
        buttonType="primary"
        label="Сохранить"
        size="medium"
      />
      {isMobileForPopup ? (
        <Button
          onClick={onClickExit}
          extClassName={styles.button}
          buttonType="secondary"
          label="Выход"
          size="medium"
        />
      ) : null}
    </div>
  );
};
