import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { TextArea } from 'shared/ui/text-area';
import { Button } from 'shared/ui/button';
import feedbackSchema from './feedback.joi-sheme';

import styles from './styles.module.css';

export function FeedbackPage() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(feedbackSchema),
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
          errorText={errors?.email?.message?.toString()}
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
