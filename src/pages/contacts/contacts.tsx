import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SmartHeader } from '../../shared/ui/smart-header';
import { Icon } from '../../shared/ui/icons';
import { Button } from '../../shared/ui/button';
import usePermission from '../../shared/hooks/use-permission';
import { UserRole, UserStatus } from '../../shared/types/common.types';
import {
  useGetContactsQuery,
  useUpdateContactsMutation,
} from '../../services/contacts-api';
import { setContacts } from '../../entities/contacts/model';
import { TContacts } from 'entities/contacts/types';

export function ContactsPage() {
  const isEditAllowed = usePermission([UserStatus.VERIFIED], UserRole.ADMIN);

  const [contactsData, setContactsData] = useState<TContacts>({
    email: null,
    socialNetwork: null,
  });

  const [enableEdit, setEnableEdit] = useState({
    email: false,
    socialNetwork: false,
  });

  const dispatch = useAppDispatch();
  const { email, socialNetwork } = useAppSelector((state) => state.contacts);
  const [updateContacts, { isLoading }] = useUpdateContactsMutation();
  const getContactsResult = useGetContactsQuery();

  useEffect(() => {
    if (getContactsResult.data) {
      dispatch(setContacts(getContactsResult.data));
      setContactsData({
        email: email,
        socialNetwork: socialNetwork,
      });
    }
  }, [getContactsResult, email, socialNetwork]);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (isEditAllowed) {
      try {
        const resultAction = await updateContacts(contactsData);
        if ('data' in resultAction) {
          dispatch(setContacts(resultAction.data));
        } else {
          console.error('Ошибка при сохранении данных:', resultAction.error);
        }
        setEnableEdit({
          email: false,
          socialNetwork: false,
        });
        setContactsData({
          email: email,
          socialNetwork: socialNetwork,
        });
      } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
      }
    } else {
      setEnableEdit({
        email: false,
        socialNetwork: false,
      });
      setContactsData({
        email: email,
        socialNetwork: socialNetwork,
      });
      console.log(
        'Изменение контактых данных не доступно для текущего пользователя'
      );
    }
  };

  const emailHandler = () => {
    setEnableEdit({
      ...enableEdit,
      email: true,
    });
  };

  const socialNetworkHandler = () => {
    setEnableEdit({
      ...enableEdit,
      socialNetwork: true,
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContactsData({ ...contactsData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SmartHeader
        text="Контакты"
        icon={<Icon color="blue" icon="ContactsIcon" size="54" />}
      />
      <form onSubmit={onSubmit}>
        <div className={styles.container}>
          <div className={styles.element_box}>
            <h2
              className={classNames(
                'text',
                'text_size_large',
                'text_type_regular',
                styles.title
              )}
            >
              Эл. почта
            </h2>
            <input
              type="text"
              className={styles.input}
              onChange={onChange}
              name="email"
              value={contactsData.email || ''}
              readOnly={!enableEdit.email}
              onClick={(e) => {
                if (!enableEdit.email) {
                  e.preventDefault();
                  window.location.href = `mailto:${contactsData.email}`;
                }
              }}
            />
          </div>
          {isEditAllowed && (
            <div onClick={emailHandler} className={styles.edit_box}>
              <Icon color="blue" icon="EditIcon" />
              <p className={styles.edit_text}>Изменить данные</p>
            </div>
          )}
        </div>
        <div className={styles.container}>
          <div className={styles.element_box}>
            <h2
              className={classNames(
                'text',
                'text_size_large',
                'text_type_regular',
                styles.title
              )}
            >
              Страница VK
            </h2>
            <input
              type="text"
              className={styles.input}
              onChange={onChange}
              name="socialNetwork"
              value={contactsData.socialNetwork || ''}
              readOnly={!enableEdit.socialNetwork}
              onClick={(e) => {
                if (!enableEdit.socialNetwork) {
                  e.preventDefault();
                  window.location.href = `${contactsData.socialNetwork}`;
                }
              }}
            />
          </div>
          {isEditAllowed && (
            <div onClick={socialNetworkHandler} className={styles.edit_box}>
              <Icon color="blue" icon="EditIcon" />
              <p className={styles.edit_text}>Изменить данные</p>
            </div>
          )}
        </div>
        {isEditAllowed && (
          <Button
            buttonType="primary"
            label="Сохранить"
            disabled={!enableEdit.email && !enableEdit.socialNetwork}
            type="submit"
          />
        )}
      </form>
    </>
  );
}
