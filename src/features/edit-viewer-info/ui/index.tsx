import { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';

import { Avatar } from '../../../shared/ui/avatar';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';

import { CloseCrossIcon } from 'shared/ui/icons/close-cross-icon';
import { LightPopup } from 'shared/ui/light-popup';
import { useOutsideClick } from 'shared/hooks/use-outside-click';

import type { UpdateUserInfo } from 'entities/user/types';
import type { ViewerInputData } from '../types';

import styles from './edit-viewer-info.module.css';

interface EditViewerInfoProps {
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  onClickSave: (userData: UpdateUserInfo, formData: FormData) => void;
  valueName: string;
  valuePhone: string;
  valueAddress: string;
  valueId: number;
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
  const avatarPicker = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const viewerData: UpdateUserInfo = {
    fullname: valueName,
    phone: valuePhone,
    address: valueAddress,
    avatar: null,
    id: valueId,
  };

  const [userData, setUserData] = useState(viewerData);
  const avatarFile = new FormData();

  const handleChange = async (event: ViewerInputData) => {
    setIsFormEdited(true);
    setIsFormSaved(false);
    avatarFile.delete('file');
    const { value, name, files } = event.target;
    if (files) {
      // Если загружен файл изображения, отрисовываем в компоненте аватара
      setImage(URL.createObjectURL(files[0]));
      avatarFile.append('file', files[0]);
      setUserData({ ...userData, [name]: value });
    }
    setUserData({ ...userData, [name]: value });
  };

  const handlePick = () => {
    if (avatarPicker.current) {
      avatarPicker.current.click();
    }
  };

  const handleClosePopup = () => {
    if (!isFormSaved) {
      setUserData(viewerData);
    }
    setImage('');
    setIsFormEdited(false);
    setIsPopupOpen(false);
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

  return (
    <LightPopup isPopupOpen={isPopupOpen} onClickExit={handleClosePopup}>
      <div
        ref={modalRef}
        className={classnames(styles.container, extClassName)}
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
            <CloseCrossIcon
              className={styles.closeIcon}
              size="14"
              color="blue"
              onClick={handleClosePopup}
            />
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
                value={userData.fullname}
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
                value={userData.phone}
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
                value={userData.address}
                onChange={handleChange}
                name="address"
                {...props}
              />
            </li>
          </ul>
        </div>
        <Button
          onClick={() => onClickSave(userData, avatarFile)}
          extClassName={styles.button}
          buttonType="primary"
          label="Сохранить"
          size="medium"
        />
      </div>
    </LightPopup>
  );
};
