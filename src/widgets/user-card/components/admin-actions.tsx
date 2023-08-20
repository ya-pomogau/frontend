import { useState } from 'react';
import classnames from 'classnames';

import Checkbox from 'shared/ui/checkbox';
import { Input } from 'shared/ui/input';
import { EditIcon } from 'shared/ui/icons/edit-icon';
import { Button } from 'shared/ui/button';
import { ArrowDownIcon } from 'shared/ui/icons/arrow-down-icon';

import styles from '../styles.module.css';

interface AdminActionsProps {
  onAdminSaveClick: () => void;
  onAdminBlockClick: () => void;
}

const AdminActions = ({
  onAdminSaveClick,
  onAdminBlockClick,
}: AdminActionsProps) => {
  const [isAdminDropdownListClosed, setAdminDropdownListClosed] =
    useState(true);

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
          type="password"
        />
        <EditIcon
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
              onClick={onAdminSaveClick}
            />
          </div>
          <div className={classnames(styles.admin_dropdown_list_closed_box)}>
            <div
              className={classnames(styles.admin_arrow_down)}
              onClick={() => setAdminDropdownListClosed(false)}
            >
              <ArrowDownIcon color={'blue'} />
            </div>
          </div>
        </>
      ) : (
        <div className={classnames(styles.admin_dropdown_list_opened_box)}>
          <div
            className={classnames(styles.admin_arrow_up)}
            onClick={() => setAdminDropdownListClosed(true)}
          >
            <ArrowDownIcon color={'blue'} />
          </div>
          <div className={classnames(styles.admin_checkboxes)}>
            <Checkbox
              extClassName={styles.admin_checkbox}
              label={'Подтверждать аккаунты'}
            />
            <Checkbox
              extClassName={styles.admin_checkbox}
              label={'Создавать заявки'}
            />
            <Checkbox
              extClassName={styles.admin_checkbox}
              label={'Раздавать ключи'}
            />
            <Checkbox
              extClassName={styles.admin_checkbox}
              label={'Решать споры'}
            />
            <Checkbox
              extClassName={styles.admin_checkbox}
              label={'Контент блог'}
            />
            <Checkbox
              extClassName={styles.admin_checkbox}
              label={'Повышение балов'}
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
