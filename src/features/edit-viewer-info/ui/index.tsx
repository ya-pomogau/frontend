import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classnames from 'classnames';

import { Avatar } from '../../../shared/ui/avatar';
import { Button } from '../../../shared/ui/button';
import { FormInput } from '../../../shared/ui/form-input';

import { LightPopup } from 'shared/ui/light-popup';

import styles from './edit-viewer-info.module.css';

interface EditViewerInfoForm {
  name: string;
  phone: string;
  address: string;
}

interface EditViewerInfoProps {
  extClassName?: string;
  userAvatar: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  onSave: SubmitHandler<EditViewerInfoForm>;
  isOpen: boolean;
  onClose: () => void;
}

export const EditViewerInfo = ({
  userName,
  userPhone,
  userAddress,
  userAvatar,
  onSave,
  isOpen,
  onClose,
  extClassName,
}: EditViewerInfoProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: userName,
      phone: userPhone,
      address: userAddress,
    },
    mode: 'onChange',
  });

  const avatarPicker = useRef<HTMLInputElement>(null);

  const onSubmit: EditViewerInfoProps['onSave'] = (data) => {
    onSave(data);
    onClose();
  };

  useEffect(() => reset(), [isOpen]);

  const handlePick = () => {
    if (avatarPicker.current) {
      avatarPicker.current.click();
    }
  };

  const inputLabelStyles = classnames(
    styles.infoBlock__text,
    'text',
    'text_size_small',
    'm-0',
    'p-0',
    'text_type_bold'
  );

  const popupStyles = classnames(styles.container, extClassName);

  return (
    <LightPopup
      extClassName={popupStyles}
      hasCloseButton
      isPopupOpen={isOpen}
      onClickExit={onClose}
    >
      <div className={styles.headerElements}>
        <div className={styles.avatarBlock}>
          <Avatar
            extClassName={styles.avatar}
            avatarLink={userAvatar}
            avatarName={`Аватар пользователя ${userName}`}
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
            disabled
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
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className={classnames(styles.infoBlock, 'list')}>
          <li className={styles.infoBlock__item}>
            <p className={inputLabelStyles}>Имя:</p>
            <FormInput
              type="text"
              name="name"
              rules={{
                required: {
                  value: true,
                  message: 'Имя обязательно',
                },
              }}
              control={control}
              extClassName={styles.input}
              placeholder="Введите имя"
            />
          </li>
          <li className={styles.infoBlock__item}>
            <p className={inputLabelStyles}>Тел.:</p>
            <FormInput
              type="tel"
              name="phone"
              rules={{
                required: 'Телефон обязателен',
                pattern: {
                  value: /^([+]7|8)\d{10}$/,
                  message: 'Неверный формат номера',
                },
              }}
              control={control}
              extClassName={styles.input}
              placeholder="Введите телефон"
            />
          </li>
          <li className={styles.infoBlock__item}>
            <p className={inputLabelStyles}>Адрес:</p>
            <FormInput
              type="text"
              name="address"
              rules={{ required: 'Адрес обязателен' }}
              control={control}
              extClassName={styles.input}
              placeholder="Введите адрес"
            />
          </li>
        </ul>
        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          extClassName={styles.button}
          buttonType="primary"
          label="Сохранить"
          size="medium"
        />
      </form>
    </LightPopup>
  );
};
