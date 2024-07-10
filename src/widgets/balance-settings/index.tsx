import { SyntheticEvent, useEffect } from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';
import { Button } from '../../shared/ui/button';
import usePermission from '../../shared/hooks/use-permission';
import useForm from '../../shared/hooks/use-form';
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
  const { values, setValues, handleChange } = useForm<TPoints<string>>({});

  useEffect(() => {
    const initialValues: TPoints<string> = {};
    data?.map((item) => {
      const { title, points } = item;
      initialValues[title] = points;
    });
    setValues(initialValues);
  }, [data]);

  //при сохранении будет ошибка, так как updatePoints обращается к пока несуществующему эндпоинту
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await updatePoints(values);
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  return (
    <form
      className={classnames(styles.container, extClassName)}
      onSubmit={handleSubmit}
    >
      <div className={classnames(styles.balances_box)}>
        {data &&
          data.map((item, index) => (
            <BalanceSettingsItem
              key={index}
              title={item.title}
              inputValue={`${values[item.title]}`}
              handleChange={handleChange}
            />
          ))}
      </div>
      <Button
        extClassName={classnames(styles.save_btn)}
        buttonType="primary"
        label="Сохранить"
        size="large"
        actionType="submit"
        disabled={!isEditAllowed}
      />
    </form>
  );
};
