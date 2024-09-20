import { Control, Controller } from 'react-hook-form';

import { Button, Checkbox } from 'shared/ui';
import { ArrowDownIcon } from 'shared/ui/icons/arrow-down-icon';
import { adminPermission, AdminPermission } from 'shared/types/common.types';

import styles from '../../styles.module.css';

interface AdminDropdownMenuProps {
  onAdminBlockClick: () => void;
  onSwitchArrow: () => void;
  setAdminDropdownListClosed: (closed: boolean) => void;
  control: Control<Record<AdminPermission, boolean>, unknown>;
}

export const AdminDropdownMenu = ({
  onAdminBlockClick,
  onSwitchArrow,
  setAdminDropdownListClosed,
  control,
}: AdminDropdownMenuProps) => {
  return (
    <div className={styles.admin_dropdown_list_opened_box}>
      <div
        className={styles.admin_arrow_up}
        onClick={() => setAdminDropdownListClosed(true)}
      >
        <ArrowDownIcon color="blue" onClick={onSwitchArrow} />
      </div>
      <div className={styles.admin_checkboxes}>
        <Controller
          control={control}
          name={adminPermission.CONFIRMATION}
          render={({ field }) => (
            <Checkbox
              id={field.name}
              extClassName={styles.admin_checkbox}
              label="Подтверждать аккаунты"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name={adminPermission.TASKS}
          render={({ field }) => (
            <Checkbox
              id={field.name}
              extClassName={styles.admin_checkbox}
              label="Создавать заявки"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name={adminPermission.KEYS}
          render={({ field }) => (
            <Checkbox
              id={field.name}
              extClassName={styles.admin_checkbox}
              label="Раздавать ключи"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name={adminPermission.CONFLICTS}
          render={({ field }) => (
            <Checkbox
              id={field.name}
              extClassName={styles.admin_checkbox}
              label="Решать споры"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name={adminPermission.BLOG}
          render={({ field }) => (
            <Checkbox
              id={field.name}
              extClassName={styles.admin_checkbox}
              label="Контент блог"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name={adminPermission.CATEGORIES}
          render={({ field }) => (
            <Checkbox
              id={field.name}
              extClassName={styles.admin_checkbox}
              label="Повышение балов"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div className={styles.admin_block_btn}>
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
