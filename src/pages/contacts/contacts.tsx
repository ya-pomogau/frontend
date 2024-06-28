import { SyntheticEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';
import { SmartHeader } from '../../shared/ui/smart-header';
import { Icon } from '../../shared/ui/icons';
import { Button } from '../../shared/ui/button';
import usePermission from '../../shared/hooks/use-permission';
import {
  UserRole,
  UserStatus,
  TContacts,
} from '../../shared/types/common.types';
import useForm from '../../shared/hooks/use-form';
import { useGetContactsQuery } from '../../services/contacts-api';
import { useUpdateContactsMutation } from '../../services/admin-api';

const initialContactsValues = {
  email: null,
  socialNetwork: null,
};

export function ContactsPage() {
  const isEditAllowed = usePermission([UserStatus.VERIFIED], UserRole.ADMIN);
  const [updateContacts, { isLoading }] = useUpdateContactsMutation();

  const { data } = useGetContactsQuery();

  const { values, setValues, handleChange, isValid } = useForm<TContacts>(
    initialContactsValues
  );

  useEffect(() => {
    setValues({
      email: data?.email,
      socialNetwork: data?.socialNetwork,
    });
  }, [data]);

  const [editingInput, setEditingInput] = useState<
    'email' | 'socialNetwork' | null
  >(null);

  const editBoxHandler = (inputName: 'email' | 'socialNetwork') => {
    setEditingInput(inputName);
  };

  const isButtonDisabled = editingInput === null || !isValid;

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await updateContacts(values);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
      values.email = data?.email;
      values.socialNetwork = data?.socialNetwork;
    } finally {
      setEditingInput(null);
    }
  };

  const getContactContainer = (inputName: 'email' | 'socialNetwork') => {
    const titleText = inputName === 'email' ? 'Эл. почта' : 'Соцсети';
    const editBoxText =
      inputName === 'email' ? 'Изменить эл. почту' : 'Изменить соцсети';
    const inputHref =
      inputName === 'email'
        ? `mailto:${values.email}`
        : `${values.socialNetwork}`;
    const inputType = inputName === 'email' ? 'email' : 'url';

    return (
      <div className={styles.container}>
        <div className={styles.element_box}>
          <h2
            className={classNames(
              'text',
              'text_size_large',
              'text_type_regular',
              'm-0',
              styles.title
            )}
          >
            {titleText}
          </h2>
          <input
            type={inputType}
            className={`${styles.input} ${
              editingInput === inputName
                ? styles.input_mode_edit
                : styles.input_mode_link
            }`}
            onChange={handleChange}
            name={inputName}
            value={values[inputName] || ''}
            readOnly={editingInput !== inputName}
            onClick={(e) => {
              if (editingInput !== inputName) {
                e.preventDefault();
                window.location.href = inputHref;
              }
            }}
          />
        </div>
        {isEditAllowed && (
          <div
            onClick={() => editBoxHandler(inputName)}
            className={
              editingInput === inputName
                ? styles.edit_box_hidden
                : styles.edit_box
            }
          >
            <Icon color="blue" icon="EditIcon" />
            <p
              className={classNames(
                'text',
                'text_size_small',
                'text_type_regular',
                'm-0'
              )}
            >
              {editBoxText}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <SmartHeader
        text="Контакты"
        icon={<Icon color="blue" icon="ContactsIcon" size="54" />}
      />
      <form className={styles.form} onSubmit={onSubmit}>
        {getContactContainer('email')}
        {getContactContainer('socialNetwork')}
        {isEditAllowed && (
          <Button
            buttonType="primary"
            label="Сохранить"
            disabled={isButtonDisabled}
            type="submit"
          />
        )}
      </form>
    </>
  );
}
