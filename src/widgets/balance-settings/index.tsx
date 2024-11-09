import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from 'shared/ui';
import { useGetCategoriesQuery, useUpdatePointsMutation } from 'services';
import BalanceSettingsItem from './components/balance-settings-item';

import styles from './styles.module.css';

type BalanceSettingsForm = Record<string, { _id: string; points: number }>;

export const BalanceSettings = () => {
  const { data } = useGetCategoriesQuery();
  const [updatePoints] = useUpdatePointsMutation();
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, dirtyFields },
    reset,
  } = useForm<BalanceSettingsForm>({
    values: (data || []).reduce((acc, value) => {
      const { title, points, _id } = value;
      acc[title] = { points, _id };

      return acc;
    }, {} as BalanceSettingsForm),
  });

  const onSubmit: SubmitHandler<BalanceSettingsForm> = async (formData) => {
    const formattedData = Object.keys(dirtyFields).reduce((acc, key) => {
      if (dirtyFields[key]) {
        const { points, _id } = formData[key];
        acc.push({ id: _id, points });
      }
      return acc;
    }, [] as Array<{ id: string; points: number }>);

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
          data.map(({ title }, index) => (
            <Controller
              control={control}
              name={`${title}.points`}
              key={index}
              render={({ field }) => (
                <BalanceSettingsItem
                  title={title}
                  inputValue={field.value}
                  handleChange={(e) => field.onChange(e.target.valueAsNumber)}
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
