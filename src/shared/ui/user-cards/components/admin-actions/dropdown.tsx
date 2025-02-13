import { Control, Controller } from 'react-hook-form';

import { Button, Checkbox } from 'shared/ui';
import { adminPermission, AdminPermission } from 'shared/types/common.types';

import styles from './styles.module.css';

interface AdminDropdownMenuProps {
  onAdminBlockClick: () => void;
  control: Control<Record<AdminPermission, boolean>, unknown>;
}

export const AdminDropdownMenu = ({
  onAdminBlockClick,
  control,
}: AdminDropdownMenuProps) => {
  return (
    <div className={styles.dropdown}>
      <div className={styles.container}>
        <Controller
          control={control}
          name={adminPermission.CONFIRMATION}
          render={({ field }) => (
            <Checkbox
              id={field.name}
              extClassName={styles.checkbox}
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
              extClassName={styles.checkbox}
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
              extClassName={styles.checkbox}
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
              extClassName={styles.checkbox}
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
              extClassName={styles.checkbox}
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
              extClassName={styles.checkbox}
              label="Повышение балов"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <Button
        extClassName={styles.button}
        buttonType="secondary"
        label="Заблокировать"
        onClick={onAdminBlockClick}
      />
    </div>
  );
};
