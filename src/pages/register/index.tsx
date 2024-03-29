import { FormEvent, useState } from 'react';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { InputAddress } from 'shared/ui/input-address';

import styles from './styles.module.css';
import { FilterItemsIds } from 'features/filter/consts';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { newUserThunk, vkUserSelector } from 'services/system-slice';
import { UserRole } from 'shared/types/common.types';
import { GeoCoordinates } from 'shared/types/point-geojson.types';

export function RegisterPage() {
  const vkUser = useAppSelector(vkUserSelector);
  const {
    first_name = '',
    last_name = '',
    id = '',
    photo_max_orig = '',
  } = vkUser ?? {};
  const FIO = `${first_name} ${last_name}`;
  const [name, setName] = useState<string>(FIO);
  const [phone, setPhone] = useState<string>('');
  const [role, setRole] = useState<UserRole>(UserRole.VOLUNTEER);
  const [address, setAddress] = useState<{
    address: string;
    coords: GeoCoordinates;
  }>({
    address: '',
    coords: [],
  });
  const dispatch = useAppDispatch();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const vk_id = `${id}`;
    const user = {
      name: name,
      phone,
      address: address.address,
      avatar: photo_max_orig,
      location: {
        type: 'Point',
        coordinates: address.coords,
      },
      vkId: vk_id,
      role: role,
    };
    dispatch(newUserThunk(user));
  };

  const handleAddressValueChange = (
    newAddress: string,
    coords?: GeoCoordinates
  ) => {
    setAddress({
      address: newAddress,
      coords: coords || [],
    });
  };
  const handleRoleButtonClick = (checkRole: UserRole) => {
    setRole(checkRole);
  };
  // определение внешнего вида кнопки выбора роли
  const getRoleButtonType = (userRole: string) =>
    role === userRole ? 'primary' : 'secondary';

  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        text="Регистрация"
        extClassName={styles.header}
      />
      <p className={styles.titlePrimary}>Зарегистрироваться</p>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.buttonContainer}>
          <Button
            buttonType={getRoleButtonType(FilterItemsIds.VOLUNTEER)}
            size="extraLarge"
            label="Хочу помочь"
            id={FilterItemsIds.VOLUNTEER}
            onClick={() => handleRoleButtonClick(FilterItemsIds.VOLUNTEER)}
            actionType="button"
          />
          <Button
            buttonType={getRoleButtonType(FilterItemsIds.RECIPIENT)}
            size="extraLarge"
            label="Нужна помощь"
            id={FilterItemsIds.RECIPIENT}
            onClick={() => handleRoleButtonClick(FilterItemsIds.RECIPIENT)}
            actionType="button"
          />
        </div>
        <Input
          extClassName={styles.field}
          required
          label="ФИО"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="ФИО"
          type="text"
        />

        <Input
          extClassName={styles.field}
          required
          label="Телефон"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+70010900213"
          type="tel"
          pattern="^[+]7\d{10}$"
          title="+71234567890"
        />

        <div>
          <InputAddress
            required
            name="address"
            address={address}
            setAddress={handleAddressValueChange}
          />

          <p className={styles.text}>
            Укажите адрес и мы подберем ближайшее к вам задание
          </p>
        </div>

        <Button
          buttonType="primary"
          actionType="submit"
          label="Подтвердите корректность данных"
          size="extraLarge"
        />
      </form>
    </>
  );
}
