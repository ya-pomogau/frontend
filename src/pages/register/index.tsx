import { FormEvent, useState } from 'react';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { VkIcon } from 'shared/ui/icons/vk-icon';

import styles from './styles.module.css';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Региcтрация:', name, phone, address);
  };

  return (
    <>
      <SmartHeader
        settingIcon={<Icon color="blue" icon="RegistrationIcon" size="54" />}
        settingText="Регистрация"
        extClassName={styles.header}
      />
      <p className={styles.title}>Зарегистрироваться</p>

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
          {/* <InputAddress
                inputAttributes={{
                  required: true,
                }}
                initialValue=""
                name="address"
                onChange={setAddress}
              /> */}
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
    </>
  );
}
