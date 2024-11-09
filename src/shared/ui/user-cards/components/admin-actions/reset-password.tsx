import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Input, Icon, Button } from 'shared/ui';
import { resetPasswordSchema } from './schema';

import styles from '../../styles.module.css';

interface ResetPasswordProps {
  handleModalClose: () => void;
}

export type TPassword = { newPassword: string; repeatPassword: string };

export const ResetPassword = ({ handleModalClose }: ResetPasswordProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TPassword>({
    mode: 'onChange',
    resolver: joiResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<TPassword> = (data) => {
    console.log(data);
    handleModalClose();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Смена пароля</h2>
        <Icon
          icon="CloseIconThin"
          className={styles.close}
          onClick={handleModalClose}
          color="blue"
        />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input_with_label}>
            <Controller
              control={control}
              name={'newPassword'}
              render={({ field }) => (
                <Input
                  name={field.name}
                  className={styles.input_field}
                  onChange={field.onChange}
                  label="Пароль"
                  placeholder="Введите новый пароль"
                  type="password"
                />
              )}
            />
            {errors.newPassword && (
              <span className={styles.error}>{errors.newPassword.message}</span>
            )}
          </div>
          <div className={styles.input_with_label}>
            <Controller
              control={control}
              name={'repeatPassword'}
              render={({ field }) => (
                <Input
                  name={field.name}
                  className={styles.input_field}
                  onChange={field.onChange}
                  label="Повторите пароль"
                  placeholder="Повторите пароль"
                  type="password"
                />
              )}
            />
            {errors.repeatPassword && (
              <span className={styles.error}>
                {errors.repeatPassword.message}
              </span>
            )}
          </div>
          <Button
            buttonType="primary"
            actionType="submit"
            className={styles.modalBtn}
            label="Cохранить"
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
};
