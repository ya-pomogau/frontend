import useForm from 'shared/hooks/use-form';

import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { TextArea } from 'shared/ui/text-area';
import { Button } from 'shared/ui/button';

import styles from './styles.module.css';

export function FeedbackPage() {
  const { values, handleChange } = useForm({
    firstName: '',
    email: '',
    message: '',
  });

  return (
    <>
      <SmartHeader
        text="Напишите нам"
        icon={<Icon color="blue" icon="EmptyMessageIcon" size="54" />}
      />
      <form className={styles.form}>
        <Input
          label="ФИО"
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          placeholder="Иванов Иван Иванович"
          type="text"
          extClassName={styles.input}
        />
        <Input
          label="Эл. почта"
          name="email"
          onChange={handleChange}
          value={values.email}
          placeholder="www@yandex.ru"
          type="text"
          extClassName={styles.input}
        />
        <TextArea
          label="Комментарий"
          name="message"
          onChange={handleChange}
          value={values.message}
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
