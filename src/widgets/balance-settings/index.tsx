import { SyntheticEvent, useEffect, useState } from 'react';
import classnames from 'classnames';

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
  const { values, setValues, handleChange } = useForm<TPoints<string>>({});
  const [isСhanged, setIsСhanged] = useState(false);

  useEffect(() => {
    const initialValues: TPoints<string> = {};
    data?.map((item) => {
      const { title, points } = item;
      initialValues[title] = points;
    });
    setValues(initialValues);
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setIsСhanged(true);
  };

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
              handleChange={handleInputChange}
            />
          ))}
      </div>
      <Button
        extClassName={classnames(styles.save_btn)}
        buttonType="primary"
        label="Сохранить"
        size="large"
        actionType="submit"
        disabled={!isEditAllowed || !isСhanged}
      />
    </form>
  );
};
