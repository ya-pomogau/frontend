import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Accordion, Button } from 'shared/ui';
import { LightPopup } from 'shared/ui/light-popup';
import styles from './styles.module.css';
import { User } from 'entities/user/types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  admins: User[] | undefined;
};

interface IFormInput {
  selectAdmin: string;
}

interface IConflictAdminList {
  value: string;
  label: string;
}

export const AdminSelectModal = ({ isOpen, onClose, admins }: Props) => {
  const [selectedAdmin, setSelectedAdmin] = useState<string>(''); // Храним админа который был выбран после сабмита, временное решение
  const adminList: Array<IConflictAdminList> = []; // Список всех доступных админов для вывода в селект

  if (admins) {
    admins.forEach((el) => adminList.push({ value: el.name, label: el.name }));
  }

  const { control, handleSubmit, watch } = useForm<IFormInput>({
    defaultValues: {
      selectAdmin: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (selectedAdmin === data.selectAdmin) {
      console.log(`Этот администратор уже выбран ${selectedAdmin}`);
    }

    if (selectedAdmin !== data.selectAdmin) {
      setSelectedAdmin(data.selectAdmin);
      console.log(
        `Выбран администратор для решения конфликта ${data.selectAdmin}`
      );
    }

    onClose();
  };

  const handlePlaceholder = (value: string): string =>
    String(
      adminList.find((n) => n.value === selectedAdmin)?.label
        ? `Выбран администратор: ${selectedAdmin}`
        : value
        ? value
        : 'Выберите администратора'
    );

  const handleButtonLabel = (): string =>
    String(
      watch('selectAdmin') === selectedAdmin && selectedAdmin !== ''
        ? 'Администратор выбран'
        : selectedAdmin === ''
        ? 'Подтвердить выбор'
        : 'Изменить выбор'
    );

  const disabledButton =
    !watch('selectAdmin') ||
    (watch('selectAdmin') === selectedAdmin && selectedAdmin !== '');

  return (
    <LightPopup
      extClassName={styles.modal}
      hasCloseButton
      isPopupOpen={isOpen}
      onClickExit={onClose}
    >
      <form
        className={styles.form}
        id="adminSelectForm"
        name="adminSelectForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.wrapper}>
          <Controller
            name="selectAdmin"
            control={control}
            render={({ field: { value, onChange } }) => {
              if (adminList.length > 0) {
                return (
                  <Accordion
                    extraClasses={{ extraClassListContainer: styles.scroll }}
                    name="conflict_admin"
                    arrayOptions={adminList}
                    onChange={onChange}
                    placeholder={handlePlaceholder(value)}
                  />
                );
              } else {
                return (
                  <p className={styles.description}>
                    {'Доступные для выбора администраторы отсутвуют'}
                  </p>
                );
              }
            }}
          />
        </div>
        <Button
          buttonType={'primary'}
          label={handleButtonLabel()}
          actionType={'submit'}
          disabled={disabledButton}
        />
      </form>
    </LightPopup>
  );
};
