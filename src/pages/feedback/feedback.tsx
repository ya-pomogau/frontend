// import useForm from 'shared/hooks/use-form';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { TextArea } from 'shared/ui/text-area';
import { Button } from 'shared/ui/button';

import styles from './styles.module.css';

const schema = Joi.object({
  firstName: Joi.string().allow('').optional(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .allow('')
    .optional()
    .messages({
      /* eslint-disable */
      'string.email': 'Email должен иметь вид example@example.com',
    }),
  message: Joi.string().max(300).required(),
});

interface IFormData {
  firstName: string;
  email: string;
  message: string;
}
export function FeedbackPage() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
  });

  function onSubmit() {
    console.log(getValues());
    console.log('test');
    reset();
  }

  return (
    <>
      <SmartHeader
        text="Напишите нам"
        icon={<Icon color="blue" icon="EmptyMessageIcon" size="54" />}
      />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="ФИО"
          placeholder="Иванов Иван Иванович"
          type="text"
          extClassName={styles.input}
          {...register('firstName', { required: false })}
        />
        <Input
          label="Эл. почта"
          placeholder="www@yandex.ru"
          type="email"
          extClassName={styles.input}
          error={errors?.email && true}
          errorText={
            !(errors?.email?.message === undefined) && errors?.email?.message
          }
          {...register('email', { required: false })}
        />
        <TextArea
          label="Комментарий"
          placeholder="Задайте Ваш вопрос"
          extClassName={styles.text_area}
          {...register('message', { required: false })}
        />
        <Button
          buttonType="primary"
          label="Отправить"
          actionType="submit"
          extClassName={styles.button}
          disabled={!isValid}
        />
      </form>
    </>
  );
}
