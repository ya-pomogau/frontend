import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';

import useForm from 'shared/hooks/use-form';
import { ButtonContainer } from 'shared/ui/button-container';
import { CardButton } from 'shared/ui/card-button';
import { ContentLayout } from 'shared/ui/content-layout';
import { Icon } from 'shared/ui/icons';
import { PageLayout } from 'shared/ui/page-layout';
import { SmartHeader } from 'shared/ui/smart-header';
import { Input } from 'shared/ui/input';
import { TextArea } from 'shared/ui/text-area';
import { Button } from 'shared/ui/button';
import { NotFoundPage } from 'pages/not-found';

import styles from './styles.module.css';

export function ContactsPage() {
  const { values, handleChange } = useForm({
    firstName: '',
    email: '',
    message: '',
  });

  return (
    <PageLayout
      side={
        <ButtonContainer extClassName={styles.button_container} auth>
          <NavLink to="contacts" className="link">
            {({ isActive }) => (
              <CardButton
                customIcon={
                  <Icon color="white" icon="ContactsIcon" size="54" />
                }
                text="Контакты"
                isActive={isActive}
              />
            )}
          </NavLink>
          <NavLink to="feedback" className="link">
            {({ isActive }) => (
              <CardButton
                customIcon={
                  <Icon color="white" icon="EmptyMessageIcon" size="54" />
                }
                text="Напишите нам"
                isActive={isActive}
              />
            )}
          </NavLink>
        </ButtonContainer>
      }
      content={
        <Routes>
          <Route index element={<Navigate to="contacts" replace />} />
          <Route
            path="contacts"
            element={
              <ContentLayout
                heading={
                  <SmartHeader
                    settingIcon={
                      <Icon color="blue" icon="ContactsIcon" size="54" />
                    }
                    settingText="Контакты"
                  />
                }
              >
                <div className={styles.container}>
                  <h2
                    className={classNames(
                      'text',
                      'text_size_large',
                      'text_type_regular',
                      styles.title
                    )}
                  >
                    Эл. почта
                  </h2>
                  <a
                    href="mailto:www@yandex.ru"
                    className={classNames(
                      'text',
                      'text_size_large',
                      'text_type_regular',
                      styles.link
                    )}
                  >
                    www@yandex.ru
                  </a>
                </div>
                <div className={styles.container}>
                  <h2
                    className={classNames(
                      'text',
                      'text_size_large',
                      'text_type_regular',
                      styles.title
                    )}
                  >
                    Соцсети
                  </h2>
                  <a
                    className={classNames(
                      'text',
                      'text_size_large',
                      'text_type_regular',
                      styles.link
                    )}
                    href="https://vk.com/me2help"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://vk.com/me2help
                  </a>
                </div>
              </ContentLayout>
            }
          />
          <Route
            path="feedback"
            element={
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
    />
  );
}
