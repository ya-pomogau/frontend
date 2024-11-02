import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import styles from '../../styles.module.css';
import { Icon } from 'shared/ui';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

interface ResetPasswordProps {
  handleModalClose: () => void;
}

type TPassword = { newPassword: string; repeatPassword: string };

const resetPasswordSchema = Joi.object<TPassword>({
  newPassword: Joi.string().required().min(6).max(40).messages({
    'string.empty': 'Пароль обязателен',
    'string.min': 'Пароль должен быть не менее 6 символов',
    'string.max': 'Пароль должен быть не более 40 символов',
  }),
  repeatPassword: Joi.string()
    .required()
    .equal(Joi.ref('newPassword'))
    .messages({
      'string.empty': 'Повторите пароль обязателен',
      'any.only': 'Пароли не совпадают',
    }),
});

export const ResetPassword = ({ handleModalClose }: ResetPasswordProps) => {
  const {
    register,
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
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
