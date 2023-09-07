import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  Controller,
} from 'react-hook-form';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { TextArea } from 'shared/ui/text-area';
import { Button } from 'shared/ui/button';

import styles from './styles.module.css';

interface IFeedBackForm {
  firstName: string;
  email: string;
  message: string;
}

export function FeedbackPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<IFeedBackForm>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IFeedBackForm> = (data) => {
    console.log(data);
    reset();
  };

  const error: SubmitErrorHandler<IFeedBackForm> = (data) => {
    console.log(data);
  };

  return (
    <>
      <SmartHeader
        text="Напишите нам"
        icon={<Icon color="blue" icon="EmptyMessageIcon" size="54" />}
      />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, error)}>
          <Controller name={'firstName'} control={control} render={({field}) => (
              <Input
                  label="ФИО"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="Иванов Иван Иванович"
                  type="text"
                  extClassName={styles.input}
              />
          )}  />
        <Input
          label="Эл. почта"
          name="email"
          onChange={handleChange}
          placeholder="www@yandex.ru"
          type="text"
          extClassName={styles.input}
        />
        <TextArea
          label="Комментарий"
          name="message"
          onChange={handleChange}
          placeholder="Задайте Ваш вопрос"
          extClassName={styles.text_area}
        />
        <Button
          buttonType="primary"
          label="Отправить"
          actionType="submit"
          onClick={() => 1}
          extClassName={styles.button}
        />
      </form>
    </>
  );
}
