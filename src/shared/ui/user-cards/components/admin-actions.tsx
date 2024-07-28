import { useState } from 'react';
import classnames from 'classnames';

import Checkbox from 'shared/ui/checkbox';
import { Input } from 'shared/ui/input';
import { EditIcon } from 'shared/ui/icons/edit-icon';
import { Button } from 'shared/ui/button';
import { ArrowDownIcon } from 'shared/ui/icons/arrow-down-icon';
import styles from '../styles.module.css';
import { AdminPermission } from 'shared/types/common.types';

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
  const [switchBtnPassword, setSswitchBtnPassword] = useState<boolean>(false);
  const [privilegies, setPrivilegies] = useState<AdminPermission[] | undefined>(
    permissions
  );

  const handleSwitchBtn = () => {
    setSswitchBtnPassword((state) => !state);
  };
  // console.log(privilegies);

  const handleFilterChange = (name: AdminPermission) => {
    setPrivilegies((prev) =>
      prev?.includes(name)
        ? prev.filter((priv) => priv !== name)
        : [...(prev ?? []), name]
    );
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
          type={switchBtnPassword ? 'text' : 'password'}
        />
        <EditIcon
          onClick={handleSwitchBtn}
          className={classnames(styles.admin_edit_icon)}
          color={'blue'}
        />
      </div>

      {isAdminDropdownListClosed ? (
        <>
          <div className={classnames(styles.admin_save_btn)}>
            <Button
              buttonType="primary"
              label="Сохранить"
              onClick={() => onAdminSaveClick(privilegies)}
            />
          </div>
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
        <div className={classnames(styles.admin_dropdown_list_opened_box)}>
          <div
            className={classnames(styles.admin_arrow_up)}
            onClick={() => setAdminDropdownListClosed(true)}
          >
            <ArrowDownIcon color={'blue'} onClick={onSwitchArrow} />
          </div>
          <div className={classnames(styles.admin_checkboxes)}>
            <Checkbox
              extClassName={styles.admin_checkbox}
              id={Math.random() + ''}
              label={'Подтверждать аккаунты'}
              checked={privilegies?.includes(AdminPermission.CONFIRMATION)}
              onChange={() => handleFilterChange(AdminPermission.CONFIRMATION)}
            />
            <Checkbox
              extClassName={styles.admin_checkbox}
              id={Math.random() + ''}
              label={'Создавать заявки'}
              checked={privilegies?.includes(AdminPermission.TASKS)}
              onChange={() => handleFilterChange(AdminPermission.TASKS)}
            />
            <Checkbox
              extClassName={styles.admin_checkbox}
              id={Math.random() + ''}
              label={'Раздавать ключи'}
              checked={privilegies?.includes(AdminPermission.KEYS)}
              onChange={() => handleFilterChange(AdminPermission.KEYS)}
            />
            <Checkbox
              extClassName={styles.admin_checkbox}
              id={Math.random() + ''}
              label={'Решать споры'}
              checked={privilegies?.includes(AdminPermission.CONFLICTS)}
              onChange={() => handleFilterChange(AdminPermission.CONFLICTS)}
            />
            <Checkbox
              extClassName={styles.admin_checkbox}
              id={Math.random() + ''}
              label={'Контент блог'}
              checked={privilegies?.includes(AdminPermission.BLOG)}
              onChange={() => handleFilterChange(AdminPermission.BLOG)}
            />
            <Checkbox
              extClassName={styles.admin_checkbox}
              id={Math.random() + ''}
              label={'Повышение балов'}
              checked={privilegies?.includes(AdminPermission.CATEGORIES)}
              onChange={() => handleFilterChange(AdminPermission.CATEGORIES)}
            />
          </div>
          <div className={classnames(styles.admin_block_btn)}>
            <Button
              buttonType="secondary"
              label="Заблокировать"
              onClick={onAdminBlockClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActions;
