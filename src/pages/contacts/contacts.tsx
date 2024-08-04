import {
  useEffect,
  InputHTMLAttributes,
  useState,
  useLayoutEffect,
  useRef,
  MouseEvent,
} from 'react';
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
import {
  Control,
  FieldPath,
  RegisterOptions,
  FieldValues,
  SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import { useGetContactsQuery } from '../../services/contacts-api';
import { useUpdateContactsMutation } from '../../services/admin-api';
let renderCount = 0;

interface InputContactsProps<FormInputs extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  control: Control<FormInputs>;
  name: FieldPath<FormInputs>;
  rules: RegisterOptions<FormInputs>;
  type: string;
  labelText?: string;
  prefixHref?: string;
  buttonText?: string;
  isAllowed: boolean;
  link: string;
}

const InputContacts = <T extends FieldValues>({
  name,
  control,
  rules,
  type,
  labelText,
  prefixHref,
  buttonText,
  isAllowed,
  link,
}: InputContactsProps<T>) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingInput, setEditingInput] = useState<string>('');

  const editBoxHandler = (
    elm: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const editName = elm.currentTarget.name;
    setEditingInput(editName as string);
  };
  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, [editingInput]);

  return (
    <div className={styles.container}>
      <div className={styles.element_box}>
        <label
          className={classNames(
            'text',
            'text_size_large',
            'text_type_regular',
            'm-0',
            styles.title
          )}
          htmlFor={name}
        >
          {labelText}
        </label>
        <input
          {...field}
          ref={inputRef}
          type={type}
          readOnly={!editingInput.includes(name)}
          className={`${styles.input} ${
            editingInput.includes(name)
              ? styles.input_mode_edit
              : styles.input_mode_link
          } ${fieldState.invalid ? styles.error : ''}`}
          onClick={(e) => {
            if (!editingInput.includes(name)) {
              e.preventDefault();
              window.location.href = prefixHref
                ? `${prefixHref}${link}`
                : `${link}`;
            }
          }}
        />
      </div>
      {isAllowed && (
        <button
          type="button"
          name={name}
          onClick={(e) => editBoxHandler(e)}
          className={
            editingInput.includes(name)
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
            {buttonText}
          </p>
        </button>
      )}
    </div>
  );
};

export function ContactsPage() {
  const isEditAllowed = usePermission([UserStatus.VERIFIED], UserRole.ADMIN);
  const [updateContacts] = useUpdateContactsMutation();
  renderCount++;

  const { data } = useGetContactsQuery();

  const [valueEmail, setValueEmail] = useState<string>('');
  const [valueNetwork, setValueNetwork] = useState<string>('');

  const values_contacts = {
    email: valueEmail,
    socialNetwork: valueNetwork,
  };

  useEffect(() => {
    setValueEmail(data?.email as string);
    setValueNetwork(data?.socialNetwork as string);
  }, [data]);

  const { handleSubmit, control, formState, reset } = useForm<TContacts>({
    mode: 'onChange',
    defaultValues: {
      email: values_contacts.email,
      socialNetwork: values_contacts.socialNetwork,
    },
    values: data,
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const { isValid, touchedFields } = formState;
  const [submittedData, setSubmittedData] = useState({});

  const onSubmit: SubmitHandler<TContacts> = async (db) => {
    const dataSubmit = {
      email: db.email,
      socialNetwork: db.socialNetwork,
    };
    setSubmittedData(db);
    try {
      await updateContacts(dataSubmit);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
      setValueEmail(data?.email as string);
      setValueNetwork(data?.socialNetwork as string);
    } finally {
      window.location.reload();
    }
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ ...submittedData });
      console.log(submittedData);
    }
  }, [formState, submittedData, reset]);

  return (
    <>
      <div className="counter">Render Count: {renderCount}</div>
      <SmartHeader
        text="Контакты"
        icon={<Icon color="blue" icon="ContactsIcon" size="54" />}
      />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <InputContacts
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          }}
          type="email"
          labelText="Эл.почта"
          buttonText="изменить&nbsp;эл.почту"
          prefixHref="mailto:"
          isAllowed={isEditAllowed}
          link={values_contacts.email}
        />
        <InputContacts
          control={control}
          name="socialNetwork"
          rules={{
            required: true,
            pattern:
              /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
          }}
          type="url"
          labelText="Соцсети"
          buttonText="изменить&nbsp;соцсети"
          isAllowed={isEditAllowed}
          link={values_contacts.socialNetwork}
        />

        {isEditAllowed && (
          <Button
            buttonType="primary"
            label="Сохранить"
            disabled={
              !isValid || (!touchedFields.email && !touchedFields.socialNetwork)
            }
            type="submit"
          />
        )}
      </form>
    </>
  );
}
