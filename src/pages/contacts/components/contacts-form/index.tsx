import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { schema } from './schema';
import styles from './styles.module.css';
import { ContactInput } from '../ContactInput';
import { TContacts } from 'shared/types/common.types';

import { Button } from 'shared/ui/button';
import { useGetContactsQuery } from 'services/contacts-api';
import { useUpdateContactsMutation } from 'services/admin-api';

type EditableType = Record<keyof TContacts, boolean>;

interface ContactsForm extends TContacts {
  editableInputs: EditableType | null;
}
interface ContactFormProps {
  isEditAllowed: boolean;
}

export const ContactForm = ({ isEditAllowed }: ContactFormProps) => {
  const [updateContacts] = useUpdateContactsMutation();

  const { data: contacts } = useGetContactsQuery();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid, isDirty, errors },
  } = useForm<ContactsForm>({
    mode: 'onChange',
    values: {
      email: contacts?.email,
      socialNetwork: contacts?.socialNetwork,
      editableInputs: null,
    },
    resolver: joiResolver(schema),
  });

  const isButtonDisabled = !isValid || !isDirty;

  //console.log('isValid', isValid, 'isDirty', isDirty, 'errors', errors);

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
    } catch (err) {
      console.error('Ошибка при сохранении данных:', err);
    }
  };
  return (
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
            error={!!errors?.email?.message}
            errorText={errors.email?.message}
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
            error={!!errors?.socialNetwork?.message}
            errorText={errors.socialNetwork?.message}
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
  );
};

export default ContactForm;
