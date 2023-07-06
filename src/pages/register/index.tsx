import { UserInfo } from "entities/user";
import { ContentLayout } from "shared/ui/content-layout";
import { PageLayout } from "shared/ui/page-layout";
import { SmartHeader } from "shared/ui/smart-header";
import { NavLink } from "react-router-dom";
import { Icon } from "shared/ui/icons";
import { ButtonContainer } from "shared/ui/button-container";
import { CardButton } from "shared/ui/card-button";
import { Input } from "shared/ui/input";
import { FormEvent, useState } from "react";
import { Button } from "shared/ui/button";
import { VkIcon } from "shared/ui/icons/vk-icon";
import { InputAddress } from "shared/ui/input-address";
import styles from "./styles.module.css";


export function RegisterPage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Региcтрация:", name, phone, address);
    };

    // const isNumberValid = (phoneNumber: string) => {
    //     if (!phoneNumber.startsWith('8') && !phoneNumber.startsWith('+7')) {
    //       return false;
    //     }
    //     if (phoneNumber.replace(/\D/g, '').length !== 11) {
    //       return false;
    //     }
    //     return true;
    //   };
    
    //   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const currentValue = e.currentTarget.value;
    //     setValue(currentValue);
    //     if (!isNumberValid(currentValue)) {
    //       setError('Указан некорректный номер');
    //       inputRef.current?.setCustomValidity('Указан некорректный номер');
    //     } else {
    //       setError(undefined);
    //       inputRef.current?.setCustomValidity('');
    //     }
    
    //     if (onChange) {
    //       onChange(currentValue);
    //     }
    //   };

    return (
        <PageLayout
            side={
                <>
                    <div className={styles.viewer}>
                        <UserInfo onClickSettingsButton={() => 1} />
                    </div>
                    <ButtonContainer>
                        <NavLink to="map" className="link">
                            {({ isActive }) => (
                                <CardButton
                                    customIcon={
                                        <Icon color="white" icon="MapApplicationIcon" size="54" />
                                    }
                                    text="Карта заявок"
                                    isActive={isActive}
                                />
                            )}
                        </NavLink>
                        <NavLink to="active" className="link">
                            {({ isActive }) => (
                                <CardButton
                                    customIcon={
                                        <Icon color="white" icon="ActiveApplicationIcon" size="54" />
                                    }
                                    text="Активные заяки"
                                    isActive={isActive}
                                />
                            )}
                        </NavLink>
                        <NavLink to="completed" className="link">
                            {({ isActive }) => (
                                <CardButton
                                    customIcon={
                                        <Icon color="white" icon="CompletedApplicationIcon" size="54" />
                                    }
                                    text="Завершенные заявки"
                                    isActive={isActive}
                                />
                            )}
                        </NavLink>
                    </ButtonContainer>
                </>
            }
            content={
                <ContentLayout
                    heading={
                        <SmartHeader
                            settingIcon={
                                <Icon color="blue" icon="RegistrationIcon" size="54" />
                            }
                            settingText="Регистрация"
                            extClassName={styles.header}
                        />
                    }
                >

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
                            <InputAddress
                                inputAttributes={{
                                    required: true
                                }}
                                initialValue=''
                                name='address'
                                onChange={setAddress}
                            />
                            <p className={styles.text}>Укажите адрес и мы подберем ближайшее к вам задание</p>
                        </div>

                        <Button
                            buttonType="primary"
                            actionType="submit"
                            customIcon={<VkIcon color="white" size="24" />}
                            label="Зарегистрироваться через ВКонтакте"
                            size="extraLarge"
                        />
                    </form>
                </ContentLayout>
            }
        />
    );
}
