import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input, Button } from 'shared/ui';
import { useControlModal } from 'shared/hooks';
import { EditIcon } from 'shared/ui/icons/edit-icon';
import { ArrowDownIcon } from 'shared/ui/icons/arrow-down-icon';
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
  onSwitchArrow: () => void;
}

const AdminActions = ({
  id,
  onSwitchArrow,
  permissions,
}: AdminActionsProps) => {
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

    await addAdminPrivileges({ _id: id, result });
  };

  const handleBlock = async () => {
    await blockAdmin(id);
  };

  return (
    <div className={styles.buttons_div}>
      <div className={styles.admin_login_box}>
        <Input
          className={styles.admin_login_input}
          label="Логин"
          name="login"
          onChange={(e) => {
            console.log(e);
          }}
          value="Login"
          placeholder="Логин"
          type="text"
        />
      </div>
      <div className={styles.admin_password_box}>
        <Input
          className={styles.admin_password_input}
          label="Пароль"
          name="password"
          onChange={(e) => {
            console.log(e);
          }}
          value={'Пароль'}
          placeholder="Пароль"
          type={'password'}
          disabled
        />
        <EditIcon
          onClick={handleModalOpen}
          className={styles.admin_edit_icon}
          color={'blue'}
        />
      </div>
      {isAdminDropdownListClosed ? (
        <>
          {isDirty && (
            <div className={styles.admin_save_btn}>
              <Button
                buttonType="primary"
                label="Сохранить"
                onClick={handleSubmit}
              />
            </div>
          )}
          <div className={styles.admin_dropdown_list_closed_box}>
            <div
              className={styles.admin_arrow_down}
              onClick={() => setAdminDropdownListClosed(false)}
            >
              <ArrowDownIcon color={'blue'} onClick={onSwitchArrow} />
            </div>
          </div>
        </>
      ) : (
        <AdminDropdownMenu
          control={control}
          onAdminBlockClick={handleBlock}
          onSwitchArrow={onSwitchArrow}
          setAdminDropdownListClosed={setAdminDropdownListClosed}
        />
      )}
      {isModalOpen && <ResetPassword handleModalClose={handleModalClose} />}
    </div>
  );
};

export default AdminActions;
