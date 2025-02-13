import { useState } from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import { Input, Button, Icon } from 'shared/ui';
import { useControlModal } from 'shared/hooks';

import { AdminPermission } from 'shared/types/common.types';
import {
  useAddAdminPrivilegiesMutation,
  useBlockAdminMutation,
} from 'services/admin-api';

import { ResetPassword } from './reset-password';
import { AdminDropdownMenu } from './dropdown';

import styles from '../../styles.module.css';

const defaultValues = {
  CONFIRM_USER: false,
  CREATE_TASK: false,
  GIVE_KEY: false,
  RESOLVE_CONFLICT: false,
  EDIT_BLOG: false,
  SET_CATEGORY_POINTS: false,
};

const getDefaultValues = (initialValues: AdminPermission[]) => {
  return initialValues.reduce((acc, value) => {
    if (value in acc) {
      acc[value] = true;
    }

    return acc;
  }, defaultValues);
};

interface AdminActionsProps {
  id: string;
  permissions: AdminPermission[];
}

const AdminActions = ({ id, permissions }: AdminActionsProps) => {
  const [addAdminPrivileges] = useAddAdminPrivilegiesMutation();
  const [blockAdmin] = useBlockAdminMutation();

  const [isAdminDropdownListClosed, setAdminDropdownListClosed] =
    useState(true);
  const {
    isOpen: isModalOpen,
    handleOpen: handleModalOpen,
    handleClose: handleModalClose,
  } = useControlModal();

  const {
    control,
    getValues,
    formState: { isDirty },
  } = useForm<Record<AdminPermission, boolean>>({
    values: getDefaultValues(permissions),
  });

  const handleSubmit = async () => {
    const values = getValues();
    const keysArray = Object.keys(values) as AdminPermission[];

    const result = keysArray.filter((key) => values[key]);

    await addAdminPrivileges({ _id: id, body: result });
  };

  const handleBlock = async () => {
    await blockAdmin(id);
  };

  const handleToggleDropdown = () => {
    setAdminDropdownListClosed((prev) => !prev);
  };

  return (
    <div className={styles.buttons_div}>
      <Input
        extClassNameContainer={styles.admin_login_container}
        label="Логин"
        name="login"
        value="Login"
        placeholder="Логин"
        type="text"
      />
      <Input
        customIcon={
          <Icon icon="EditIcon" onClick={handleModalOpen} color={'blue'} />
        }
        extClassNameInput={styles.admin_password_input}
        label="Пароль"
        name="password"
        value={'Пароль'}
        placeholder="Пароль"
        type={'password'}
        disabled
      />
      {isDirty && isAdminDropdownListClosed && (
        <Button
          extClassName={styles.save_button}
          buttonType="primary"
          label="Сохранить"
          onClick={handleSubmit}
        />
      )}
      <div
        className={cn(styles.admin_dropdown_list_closed_box, {
          [styles.expanded]: !isAdminDropdownListClosed,
        })}
      >
        <Icon
          icon="ArrowDownIcon"
          color="blue"
          onClick={handleToggleDropdown}
        />
      </div>
      {!isAdminDropdownListClosed && (
        <AdminDropdownMenu control={control} onAdminBlockClick={handleBlock} />
      )}
      {isModalOpen && <ResetPassword handleModalClose={handleModalClose} />}
    </div>
  );
};

export default AdminActions;
