import { useState } from 'react';
import classnames from 'classnames';
import Checkbox from 'shared/ui/checkbox';
import { Button } from 'shared/ui/button';
import { ArrowDownIcon } from 'shared/ui/icons/arrow-down-icon';
import styles from '../../styles.module.css';
import { AdminPermission } from 'shared/types/common.types';

interface AdminDropdownMenuProps {
  privilegies: AdminPermission[] | undefined;
  handleFilterChange: (name: AdminPermission) => void;
  onAdminBlockClick: () => void;
  onSwitchArrow: () => void;
  setAdminDropdownListClosed: (closed: boolean) => void;
}

export const AdminDropdownMenu = ({
  privilegies,
  handleFilterChange,
  onAdminBlockClick,
  onSwitchArrow,
  setAdminDropdownListClosed,
}: AdminDropdownMenuProps) => {
  return (
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
  );
};

export default AdminDropdownMenu;
