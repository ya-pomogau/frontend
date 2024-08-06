import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { SmartHeader } from 'shared/ui/smart-header';
import { Icon } from 'shared/ui/icons';
import { Button } from 'shared/ui/button';
import usePermission from 'shared/hooks/use-permission';
import { UserRole, UserStatus, TContacts } from 'shared/types/common.types';
import { useGetContactsQuery } from 'services/contacts-api';
import { useUpdateContactsMutation } from 'services/admin-api';
import { ContactInput } from './components';

import styles from './styles.module.css';

type EditableType = Record<keyof TContacts, boolean>;

interface ContactsForm extends TContacts {
  editableInputs: EditableType | null;
}

export function ContactsPage() {
  const isEditAllowed = usePermission([UserStatus.VERIFIED], UserRole.ADMIN);
  const [updateContacts] = useUpdateContactsMutation();

  const { data: contacts } = useGetContactsQuery();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid, isDirty },
  } = useForm<ContactsForm>({
    mode: 'onChange',
    values: {
      email: contacts?.email,
      socialNetwork: contacts?.socialNetwork,
      editableInputs: null,
    },
  });

  const isButtonDisabled = !isValid || !isDirty;

  const onEdit = (editingInput: keyof TContacts) => {
    setValue('editableInputs', {
      ...((getValues('editableInputs') as object) || {}),
      [editingInput]: true,
    } as EditableType);
  };

  const onSubmit: SubmitHandler<TContacts> = async ({
    email,
    socialNetwork,
  }) => {
    try {
      await updateContacts({
        email,
        socialNetwork,
      });

      setValue('editableInputs', null);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  return (
    <>
      <SmartHeader
        text="Контакты"
        icon={<Icon color="blue" icon="ContactsIcon" size="54" />}
      />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <ContactInput
              type="email"
              name={field.name}
              value={field.value as string}
              onChange={field.onChange}
              label="Эл.почта"
              isEditAllowed={isEditAllowed}
              editText="изменить&nbsp;эл.почту"
              isEditable={
                (watch('editableInputs') as EditableType)?.[field.name] || false
              }
              onEdit={() => onEdit(field.name)}
            />
          )}
        />
        <Controller
          control={control}
          name="socialNetwork"
          render={({ field }) => (
            <ContactInput
              type="url"
              name={field.name}
              value={field.value as string}
              onChange={field.onChange}
              label="Соцсети"
              isEditAllowed={isEditAllowed}
              editText="изменить&nbsp;соцсети"
              isEditable={
                (watch('editableInputs') as EditableType)?.[field.name] || false
              }
              onEdit={() => onEdit(field.name)}
            />
          )}
        />
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
