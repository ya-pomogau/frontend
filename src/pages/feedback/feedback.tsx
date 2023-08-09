import { Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';

import useForm from 'shared/hooks/use-form';

import { ContentLayout } from 'shared/ui/content-layout';
import { Icon } from 'shared/ui/icons';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { TextArea } from 'shared/ui/text-area';
import { Button } from 'shared/ui/button';
import { NotFoundPage } from 'pages/not-found';

import { SideMenu } from 'widgets/side-menu';
import { SideMenuLink } from 'widgets/side-menu/components/side-menu-link';

import styles from './styles.module.css';

export function FeedbackPage() {
  const { values, handleChange } = useForm({
    firstName: '',
    email: '',
    message: '',
  });

  return (
    <PageLayout
      side={
        <SideMenu
          authRequired={false}
          extClassName={styles.button_container}
          links={
            <>
              <SideMenuLink
                to="/contacts"
                icon={<Icon color="white" icon="ContactsIcon" size="54" />}
                text="Контакты"
              />
              <SideMenuLink
                to="/feedback"
                icon={<Icon color="white" icon="EmptyMessageIcon" size="54" />}
                text="Напишите нам"
              />
            </>
          }
        />
      }
      content={
        <ContentLayout
          heading={
            <SmartHeader
              settingIcon={
                <Icon color="blue" icon="EmptyMessageIcon" size="54" />
              }
              settingText="Напишите нам"
            />
          }
        >
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
        </ContentLayout>
      }
    />
  );
}
