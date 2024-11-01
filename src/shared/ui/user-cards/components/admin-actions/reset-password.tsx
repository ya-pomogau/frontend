import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import styles from '../../styles.module.css';
import { Icon } from 'shared/ui';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Typography } from 'shared/ui';

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
        <Typography
          tag={'h3'}
          variant={'paragraph-bold'}
          content={'Смена пароля'}
          extraClass={styles.modalTitle}
        />
        <Icon
          icon="CloseIconThin"
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
              errorText={errors.newPassword ? errors.newPassword.message : ''}
            />
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
              errorText={
                errors.repeatPassword ? errors.repeatPassword.message : ''
              }
            />
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
