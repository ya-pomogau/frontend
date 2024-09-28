import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from 'shared/ui';
import { TPoints } from 'shared/types/common.types';
import {
  useGetCategoriesQuery,
  useUpdatePointsMutation,
} from 'services/categories-api';
import BalanceSettingsItem from './components/balance-settings-item';

import styles from './styles.module.css';

export const BalanceSettings = () => {
  const { data } = useGetCategoriesQuery();
  const [updatePoints] = useUpdatePointsMutation();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm<Record<string, number>>({
    values: (data || []).reduce((acc, value) => {
      const { title, points } = value;
      acc[title] = points;

      return acc;
    }, {} as Record<string, number>),
  });

  //при сохранении будет ошибка, так как updatePoints обращается к пока несуществующему эндпоинту
  const onSubmit: SubmitHandler<TPoints<string>> = async (formData) => {
    const formattedData = Object.keys(formData).map((title) => {
      const category = data?.find((cat) => cat.title === title);
      return category ? { id: category._id, points: Number(formData[title]) } : null;
    });
    try {
      await updatePoints({ data: formattedData });
      reset(formData); 
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.balances_box}>
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
                  handleChange={field.onChange}
                />
              )}
            />
          ))}
      </div>

      <Button
        extClassName={styles.save_btn}
        buttonType="primary"
        label="Сохранить"
        size="large"
        actionType="submit"
        disabled={!isDirty || !isValid}
      />
    </form>
  );
};
