import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import classnames from 'classnames';

import { Avatar } from 'shared/ui/avatar';
import { Button } from 'shared/ui/button';
import { FormInput } from 'shared/ui/form-input';
import { LightPopup } from 'shared/ui/light-popup';

import { ProfileInput } from './profile-input';

import styles from './edit-viewer-info.module.css';
import { FormInputAddress } from '../../../shared/ui';
import { GeoCoordinates } from '../../../shared/types/point-geojson.types';

export interface EditViewerInfoForm {
  name: string;
  phone: string;
  address: string;
  location: {
    coordinates: GeoCoordinates;
    type: 'Point';
  };
}

export interface EditViewerInfoProps {
  extClassName?: string;
  userAvatar: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  userCoords: GeoCoordinates;
  onSave: SubmitHandler<EditViewerInfoForm>;
  isOpen: boolean;
  onClose: () => void;
}

export const EditViewerInfo = ({
  userName,
  userPhone,
  userAddress,
  userCoords,
  userAvatar,
  onSave,
  isOpen,
  onClose,
  extClassName,
}: EditViewerInfoProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm<EditViewerInfoForm>({
    defaultValues: {
      name: userName,
      phone: userPhone,
      address: userAddress,
      location: {
        coordinates: userCoords,
        type: 'Point',
      },
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

  useEffect(() => {
    reset({
      name: userName,
      phone: userPhone,
      address: userAddress,
      location: {
        coordinates: userCoords,
        type: 'Point',
      },
    });
  }, [isOpen, userName, userPhone, userAddress, reset]);

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

  const closeByEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeByEsc);
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, []);

  const handleAddressValueChange = (
    newAddress: string,
    coords?: GeoCoordinates
  ) => {
    setValue('address', newAddress, { shouldValidate: true });
    setValue(
      'location',
      { coordinates: coords || [], type: 'Point' },
      { shouldValidate: true }
    );
  };

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
            size={'big'}
            avatarLink={fileDataURL as string}
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
                  value:
                    /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[\- ]?)?\(?\d{3,5}\)?[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}[\- ]?\d{1}(([\- ]?\d{1})?[\- ]?\d{1})?$/,
                  message: 'Неверный формат номера',
                },
              }}
              control={control}
              extClassName={styles.input}
              placeholder="Введите телефон"
            />
          </ProfileInput>
          <ProfileInput label="Адрес:">
            <FormInputAddress
              name="address"
              placeholder="Адрес"
              control={control}
              extClassName={styles.input}
              setAddress={handleAddressValueChange}
            />
          </ProfileInput>
        </fieldset>
        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0 || !isDirty}
          extClassName={styles.button}
          buttonType="primary"
          label="Сохранить"
          size="medium"
        />
      </form>
    </LightPopup>
  );
};
