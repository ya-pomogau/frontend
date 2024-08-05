import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import styles from '../../styles.module.css';
import { CloseIconThin } from 'shared/ui/icons/close-icon-thin';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ResetPasswordProps {
  handleModalClose: () => void;
}

type TPassword = { newPassword: string; repeatPassword: string };

export const ResetPassword = ({ handleModalClose }: ResetPasswordProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPassword>();

  const onSubmit: SubmitHandler<TPassword> = (data) => {
    console.log(data);
    handleModalClose();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Смена пароля</h2>
        <CloseIconThin
          className={styles.close}
          onClick={handleModalClose}
          color="blue"
        />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input_with_label}>
            <Input
              className={styles.input_field}
              label="Пароль"
              {...register('newPassword', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 6,
                  message: 'Минимальная длина 6 символов',
                },
              })}
              placeholder="Введите новый пароль"
              type="password"
            />
            {errors.newPassword && (
              <span className={styles.error}>{errors.newPassword.message}</span>
            )}
          </div>
          <div className={styles.input_with_label}>
            <Input
              className={styles.input_field}
              label="Повторите пароль"
              {...register('repeatPassword', {
                required: 'Повторите пароль обязателен',
              })}
              placeholder="Повторите пароль"
              type="password"
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
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
