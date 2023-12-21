import { FormEvent, useEffect, useState } from 'react';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { InputAddress } from 'shared/ui/input-address';

import styles from './styles.module.css';
import { FilterItemsIds } from 'features/filter/consts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  newUserThunk,
  vkUserSelector,
} from 'services/system-slice';
import { UserRole } from 'shared/types/common.types';

export function RegisterPage() {
  const vkUser = useAppSelector(vkUserSelector);
  const { firstName = '', lastName = '', vkId = '' } = vkUser ?? {};
  const FIO = `${firstName} ${lastName}`;
  //TODO: перед отправкой на сервер необходимо будет name разделить на ФИО
  const [name, setName] = useState<string>(FIO);
  //TODO: разобраться с получением телефона и записью его в стейт
  const [phone, setPhone] = useState<string>('');
  const [role, setRole] = useState<UserRole>(UserRole.VOLUNTEER);
  // TODO: пока что оставила адрес в виде объекта, чтобы не ломались другие компоненты завязанные на inputAddress
  const [address, setAddress] = useState<{
    address: string;
    coords: [number, number] | [];
  }>({
    address: '',
    coords: [],
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log('Региcтрация:', {
      name: name,
      phone: phone,
      address: address.address,
      coord: address.coords,
      role: role,
    });
    const [first, last] = name.split(' ').filter((i) => i.length > 0);
    const vk_id = `${vkId}`;
    const user = {
      profile: {
        firstName: first,
        lastName: last,
        phone,
        address: address.address,
        avatar: 'https://kspshnik.com/pub/img/verona_pre.jpg',
        middleName: 'Валерьевна',
      },
      vkId: vk_id,
      role: role,
      location: {
        type: 'Point',
        coordinates: [23, 65],
      },
    };
    dispatch(newUserThunk(user));
  };

  const handleAddressValueChange = (
    newAddress: string,
    coords?: [number, number] | []
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
  const getRoleButtonType = (id: string) =>
    role === id ? 'primary' : 'secondary';

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
          placeholder="+7 (000) 000 00 00"
          type="tel"
          pattern="^[+]7 \(\d{3}\) \d{3} \d{2} \d{2}$"
          title="+7 (123) 456 78 90"
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
