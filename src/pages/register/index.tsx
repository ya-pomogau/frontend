import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';
import { InputAddress } from 'shared/ui/input-address';

import styles from './styles.module.css';

export function RegisterPage() {
  const navigate = useNavigate();

  const [showLoginButton, setShowLoginButton] = useState(false);
  const [changeContent, setChangeContent] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');

  const [address, setAddress] = useState<{
    address: string;
    coords: [number, number] | [];
  }>({
    address: '',
    coords: [],
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Региcтрация:', name, phone, address, role);
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
  const redirectToLogin = () => {
    navigate('/login');
  };
  const toggleLoginButton = () => {
    setShowLoginButton(true);
  };
  return (
    <>
      <SmartHeader
        icon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        text="Регистрация"
        extClassName={styles.header}
      />
      <p
        className={changeContent ? styles.titlePrimary : styles.titleAdditional}
      >
        Зарегистрироваться
      </p>
      {!changeContent && (
        <div className={styles.wrapper}>
          <div className={styles.buttonContainer}>
            <Button
              buttonType="primary"
              actionType="button"
              label="Хочу помочь"
              size="extraLarge"
              onClick={() => {
                setChangeContent(true);
                setRole('volunteer');
              }}
            />
            <Button
              buttonType="secondary"
              actionType="button"
              label="Нужна помощь"
              size="extraLarge"
              onClick={() => {
                setChangeContent(true);
                setRole('recipient');
              }}
            />
          </div>
          <a className={styles.link} onClick={toggleLoginButton}>
            Уже есть аккаунт
          </a>
          {showLoginButton && (
            <Button
              buttonType="primary"
              actionType="submit"
              customIcon={<VkIcon color="white" size="24" />}
              label="Войти через ВКонтакте"
              size="extraLarge"
              onClick={() => redirectToLogin()}
            />
          )}
        </div>
      )}
      {changeContent && (
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            extClassName={styles.field}
            required
            label="ФИО"
            name="name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            placeholder="ФИО"
            type="text"
          />

          <Input
            extClassName={styles.field}
            required
            label="Телефон"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.currentTarget.value)}
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
            customIcon={<VkIcon color="white" size="24" />}
            label="Зарегистрироваться через ВКонтакте"
            size="extraLarge"
          />
        </form>
      )}
    </>
  );
}
