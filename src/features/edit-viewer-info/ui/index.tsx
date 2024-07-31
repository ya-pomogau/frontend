import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classnames from 'classnames';

import { Avatar } from 'shared/ui/avatar';
import { Button } from 'shared/ui/button';
import { FormInput } from 'shared/ui/form-input';
import { LightPopup } from 'shared/ui/light-popup';

import { ProfileInput } from './profile-input';

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
      name: '',
      phone: userPhone,
      address: userAddress,
    },
    mode: 'onChange',
  });

  const avatarPicker = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileDataURL, setFileDataURL] = useState<string | undefined>(
    userAvatar
  );

  const onSubmit: EditViewerInfoProps['onSave'] = (data) => {
    onSave(data);
    onClose();
  };

  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const file = e.target.files;
    if (file && file[0].type.match(/image\/(png|jpg|jpeg)/i)) {
      setFile(file[0]);
    } else {
      alert('Invalid image format');
    }
  };

  const handlePickAvatar = () =>
    avatarPicker.current && avatarPicker.current.click();

  useEffect(() => reset(), [isOpen]);

  useEffect(() => {
    let fileReader: FileReader;
    let isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        e.target && !isCancel && setFileDataURL(e.target.result?.toString());
      };

      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <LightPopup
      extClassName={classnames(styles.container, extClassName)}
      hasCloseButton
      isPopupOpen={isOpen}
      onClickExit={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.editProfile}>
        <fieldset className={classnames(styles.fieldset, styles.avatarField)}>
          <legend className="visually-hidden">Аватар</legend>
          <Avatar
            extClassName={styles.avatarField__image}
            avatarLink={fileDataURL}
            avatarName="Аватар пользователя"
          />
          <label htmlFor="avatarUpload" className="visually-hidden">
            Изменить фото
          </label>
          <input
            onChange={changeAvatarHandler}
            className="visually-hidden"
            id="avatarUpload"
            type="file"
            name="avatar"
            accept="image/*"
            ref={avatarPicker}
          />
          <button
            onClick={handlePickAvatar}
            className={classnames(
              styles.avatarField__uploadButton,
              'text',
              'text_size_medium'
            )}
            type="button"
          >
            Изменить фото
          </button>
        </fieldset>
        <fieldset className={classnames(styles.fieldset, styles.infoBlock)}>
          <legend className="visually-hidden">Контактные данные</legend>
          <ProfileInput label="Имя">
            <FormInput
              type="text"
              name="name"
              rules={{
                required: {
                  value: true,
                  message: 'Имя не может быть пустым',
                },
              }}
              control={control}
              extClassName={styles.input}
              placeholder="Введите имя"
            />
          </ProfileInput>
          <ProfileInput label="Тел:">
            <FormInput
              type="tel"
              name="phone"
              rules={{
                required: 'Неверный формат номера',
                pattern: {
                  value: /^([+]7|8)\d{10}$/,
                  message: 'Неверный формат номера',
                },
              }}
              control={control}
              extClassName={styles.input}
              placeholder="Введите телефон"
            />
          </ProfileInput>
          <ProfileInput label="Адрес:">
            <FormInput
              type="text"
              name="address"
              rules={{ required: 'Адрес не может быть пустым' }}
              control={control}
              extClassName={classnames(styles.input, 'text_size_medium')}
              placeholder="Введите адрес"
            />
          </ProfileInput>
        </fieldset>
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
