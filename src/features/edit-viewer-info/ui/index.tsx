import { useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import classnames from 'classnames';

import { Avatar } from '../../../shared/ui/avatar';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';

import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { LightPopup } from 'shared/ui/light-popup';
import { useOutsideClick } from 'shared/hooks/use-outside-click';

import type { UpdateUserInfo } from 'entities/user/types';

import styles from './edit-viewer-info.module.css';

interface EditViewerInfoProps {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  onClickSave: (userData: Omit<UpdateUserInfo, '_id'>) => void;
  valueName: string;
  valuePhone: string;
  valueAddress: string;
  valueId: string;
  isPopupOpen: boolean;
  buttonRef: React.RefObject<HTMLElement>;
  isFormSaved: boolean;
  setIsFormSaved: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPopupOpen: (isPopupOpen: boolean) => void;
  isFormEdited: boolean;
  setIsFormEdited: (isFormEdited: boolean) => void;
  image: string;
  setImage: (image: string) => void;
}

export const EditViewerInfo = ({
  extClassName,
  avatarLink,
  avatarName,
  onClickSave,
  valueName,
  valuePhone,
  valueAddress,
  valueId,
  isPopupOpen,
  buttonRef,
  isFormSaved,
  setIsFormSaved,
  setIsPopupOpen,
  isFormEdited,
  setIsFormEdited,
  image,
  setImage,
  ...props
}: EditViewerInfoProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: valueName,
      phone: valuePhone,
      address: valueAddress,
    },
  });

  const avatarPicker = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const onSubmit = (data: Omit<UpdateUserInfo, '_id'>) => {
    onClickSave(data);
    setIsFormSaved(true);
    setIsFormEdited(false);
    setIsPopupOpen(false);
  };

  const handlePick = () => {
    if (avatarPicker.current) {
      avatarPicker.current.click();
    }
  };

  const handleClosePopup = () => {
    setImage('');
    setIsFormEdited(false);
    setIsPopupOpen(false);
    reset();
  };

  useOutsideClick({
    elementRef: modalRef,
    triggerRef: buttonRef,
    onOutsideClick: handleClosePopup,
    enabled: isPopupOpen,
  });

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, [isFormSaved]);

  const handleEscKeydown = (e: KeyboardEvent) => {
    e.key === 'Escape' && handleClosePopup();
  };

  useEffect(() => {
    setIsFormEdited(true);
    setIsFormSaved(false);
  }, [watch('name'), watch('phone'), watch('address')]);

  return (
    <LightPopup isPopupOpen={isPopupOpen} onClickExit={handleClosePopup}>
      <div
        ref={modalRef}
        className={classnames(
          styles.container,
          extClassName,
          styles.editViewerPopup
        )}
      >
        <div className={styles.containerInfo}>
          <div className={styles.headerElements}>
            <div className={styles.avatarBlock}>
              {avatarLink && !image && (
                <Avatar
                  extClassName={styles.avatar}
                  avatarLink={avatarLink}
                  avatarName={avatarName}
                />
              )}
              {image && (
                <Avatar
                  extClassName={styles.avatar}
                  avatarLink={image}
                  avatarName={image}
                />
              )}
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
            <CloseCrossIcon
              className={styles.closeIcon}
              size="14"
              color="blue"
              onClick={handleClosePopup}
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Пустое поле' }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      extClassName={styles.input}
                      placeholder="Введите имя"
                      {...field}
                    />
                  )}
                />
                {errors.name && (
                  <span className={styles.errorText}>
                    {errors.name.message}
                  </span>
                )}
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
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: 'Пустое поле',
                    pattern: {
                      value: /^[+]7\d{10}$/,
                      message: 'Неверный формат номера',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      type="tel"
                      extClassName={classnames(
                        styles.input,
                        errors.phone && styles['input--error']
                      )}
                      placeholder="Введите телефон"
                      {...field}
                    />
                  )}
                />
                {errors.phone && (
                  <span className={styles.errorText}>
                    {errors.phone.message}
                  </span>
                )}
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
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: 'Пустое поле' }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      extClassName={styles.input}
                      placeholder="Введите адрес"
                      {...field}
                    />
                  )}
                />
                {errors.address && (
                  <span className={styles.errorText}>
                    {errors.address.message}
                  </span>
                )}
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
        </div>
      </div>
    </LightPopup>
  );
};
