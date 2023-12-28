import { FormEvent, useState } from 'react';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { InputAddress } from 'shared/ui/input-address';

import styles from './styles.module.css';
import { FilterItemsIds } from 'features/filter/consts';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { newUserThunk, vkUserSelector } from 'services/system-slice';
import { UserRole } from 'shared/types/common.types';
import registerSchema from './register.joi-sheme';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

export function RegisterPage() {
  const {
    firstName = '',
    lastName = '',
    vkId = '',
  } = useAppSelector(vkUserSelector) ?? {};
  //TODO: перед отправкой на сервер необходимо будет name разделить на ФИО
  const [name, setName] = useState<string>(`${firstName} ${lastName}`);
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
    dispatch(
      newUserThunk({
        profile: {
          //TODO: перед отправкой на сервер необходимо будет name разделить на ФИО
          firstName: name,
          phone,
          address: address.address,
        },
        vkId,
        role: role,
      })
    );
    //перенаправляем на главную
    navigate('/profile');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(registerSchema),
  });

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
          placeholder="ФИО"
          type="text"
          error={errors?.name && true}
          errorText={
            !(errors?.name?.message === undefined) &&
            errors?.name?.message.toString()
          }
          {...register('name')}
        />

        <Input
          extClassName={styles.field}
          label="Телефон"
          placeholder="+7 (000) 000 00 00"
          type="tel"
          pattern="^[+]7 \(\d{3}\) \d{3} \d{2} \d{2}$"
          title="+7 (123) 456 78 90"
          error={errors?.phone && true}
          errorText={
            !(errors?.phone?.message === undefined) &&
            errors?.phone?.message.toString()
          }
          {...register('phone')}
        />

        <div>
          <InputAddress
            required
            address={address}
            setAddress={handleAddressValueChange}
            error={errors?.address && true}
            errorText={
              !errors?.address?.message === undefined &&
              errors?.address?.message?.toString()
            }
            {...register('address')}
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
