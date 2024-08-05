import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';

import { Input } from 'shared/ui/input';
import { EditIcon } from 'shared/ui/icons/edit-icon';
import { Button } from 'shared/ui/button';
import { ArrowDownIcon } from 'shared/ui/icons/arrow-down-icon';
import styles from '../../styles.module.css';
import { AdminPermission } from 'shared/types/common.types';
import { useControlModal } from 'shared/hooks';
import { ResetPassword } from './reset-password';
import { AdminDropdownMenu } from './dropdown';

interface AdminActionsProps {
  permissions: AdminPermission[] | undefined;
  onAdminSaveClick: (body: AdminPermission[] | undefined) => void;
  onAdminBlockClick: () => void;
  onSwitchArrow: () => void;
}

const AdminActions = ({
  onAdminSaveClick,
  onAdminBlockClick,
  onSwitchArrow,
  permissions,
}: AdminActionsProps) => {
  const [isAdminDropdownListClosed, setAdminDropdownListClosed] =
    useState(true);
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(false);
  const {
    isOpen: isModalOpen,
    handleOpen: handleModalOpen,
    handleClose: handleModalClose,
  } = useControlModal();

  const { watch, setValue } = useForm({
    defaultValues: {
      privilegies: permissions ?? [],
    },
  });

  const watchedPrivilegies = watch('privilegies');

  useEffect(() => {
    setIsSaveButtonVisible(watchedPrivilegies.length !== 0);
  }, [watchedPrivilegies]);

  const handleFilterChange = (name: AdminPermission) => {
    const updatedPrivilegies = watchedPrivilegies.includes(name)
      ? watchedPrivilegies.filter((priv: AdminPermission) => priv !== name)
      : [...watchedPrivilegies, name];

    setValue('privilegies', updatedPrivilegies);
  };

  return (
    <div className={classnames(styles.buttons_div)}>
      <Input
        className={classnames(styles.admin_login_input)}
        label="Логин"
        name="login"
        onChange={(e) => {
          console.log(e);
        }}
        value={'Login'}
        placeholder="Логин"
        type="text"
      />
      <div className={classnames(styles.admin_password_box)}>
        <Input
          className={classnames(styles.admin_password_input)}
          label="Пароль"
          name="password"
          onChange={(e) => {
            console.log(e);
          }}
          value={'Пароль'}
          placeholder="Пароль"
          type={'password'}
        />
        <EditIcon
          onClick={handleModalOpen}
          className={classnames(styles.admin_edit_icon)}
          color={'blue'}
        />
      </div>

      {isAdminDropdownListClosed ? (
        <>
          {isSaveButtonVisible && (
            <div className={classnames(styles.admin_save_btn)}>
              <Button
                buttonType="primary"
                label="Сохранить"
                onClick={() => onAdminSaveClick(watchedPrivilegies)}
              />
            </div>
          )}
          <div className={classnames(styles.admin_dropdown_list_closed_box)}>
            <div
              className={classnames(styles.admin_arrow_down)}
              onClick={() => setAdminDropdownListClosed(false)}
            >
              <ArrowDownIcon color={'blue'} onClick={onSwitchArrow} />
            </div>
          </div>
        </>
      ) : (
        <AdminDropdownMenu
          privilegies={watchedPrivilegies}
          handleFilterChange={handleFilterChange}
          onAdminBlockClick={onAdminBlockClick}
          onSwitchArrow={onSwitchArrow}
          setAdminDropdownListClosed={setAdminDropdownListClosed}
        />
      )}
      {isModalOpen && <ResetPassword handleModalClose={handleModalClose} />}
    </div>
  );
};

export default AdminActions;
