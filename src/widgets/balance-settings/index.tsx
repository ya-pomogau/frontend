import { useEffect } from 'react';
import classnames from 'classnames';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '../../shared/ui/button';
import usePermission from '../../shared/hooks/use-permission';
import {
  AdminPermission,
  UserRole,
  TPoints,
} from '../../shared/types/common.types';
import {
  useGetCategoriesQuery,
  useUpdatePointsMutation,
} from '../../services/categories-api';
import BalanceSettingsItem from './components/balance-settings-item';

import styles from './styles.module.css';

interface BalanceSettingsProps {
  extClassName?: string;
}

export const BalanceSettings = ({ extClassName }: BalanceSettingsProps) => {
  const isEditAllowed = usePermission(
    [AdminPermission.CATEGORIES],
    UserRole.ADMIN
  );
  const { data } = useGetCategoriesQuery();
  const [updatePoints] = useUpdatePointsMutation();
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<Record<string, number>>({
    values: (data || []).reduce((acc, value) => {
      const { title, points } = value;
      acc[title] = points;

      return acc;
    }, {} as Record<string, number>),
  });

  useEffect(() => {
    const initialValues: TPoints<string> = {};
    data?.map((item) => {
      const { title, points } = item;
      initialValues[title] = points;
      setValue(item.title, item.points);
    });
  }, [data]);

  //при сохранении будет ошибка, так как updatePoints обращается к пока несуществующему эндпоинту
  const onSubmit = async () => {
    try {
      await updatePoints(getValues());
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  return (
    <form
      className={classnames(styles.container, extClassName)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={classnames(styles.balances_box)}>
        {data &&
          data.map((item, index) => (
            <Controller
              control={control}
              name={item.title}
              key={index}
              render={({ field }) => (
                <BalanceSettingsItem
                  title={item.title}
                  inputValue={field.value}
                  handleChange={(e) => field.onChange(+e.target.value)}
                />
              )}
            />
          ))}
      </div>

      <Button
        extClassName={classnames(styles.save_btn)}
        buttonType="primary"
        label="Сохранить"
        size="large"
        actionType="submit"
        disabled={!isEditAllowed || !isDirty || !isValid}
      />
    </form>
  );
};
