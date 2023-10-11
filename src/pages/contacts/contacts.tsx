import React, { ChangeEvent, SyntheticEvent } from 'react';
import classNames from 'classnames';
import { Icon } from 'shared/ui/icons';
import { SmartHeader } from 'shared/ui/smart-header';
import { VERIFIED } from 'shared/libs/statuses';

import styles from './styles.module.css';
import { Button } from '../../shared/ui/button';
import usePermission from 'shared/hooks/use-permission';

export function ContactsPage() {
  const roleChecker = !usePermission([VERIFIED], 'admin');

  const [userData, setUserData] = React.useState({
    userEmail: 'www@yandex.ru',
    userVKLink: 'https://vk.com/me2help',
  });

  const [enableEdit, setEnableEdit] = React.useState(false);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setEnableEdit(false);
    console.log(
      `Данные email:${userData.userEmail} и  VK:${userData.userVKLink} отправлены на сервер`
    );
  };
  const handleEnableEdit = () => {
    setEnableEdit(true);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SmartHeader
        text="Контакты"
        icon={<Icon color="blue" icon="ContactsIcon" size="54" />}
      />
      <form onSubmit={onSubmit}>
        <div className={styles.container}>
          <div className={styles.element_box}>
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
            <input
              type="text"
              className={styles.input}
              onChange={onChange}
              name="userEmail"
              defaultValue={userData.userEmail}
              readOnly={!enableEdit}
              onClick={(e) => {
                if (!enableEdit) {
                  e.preventDefault();
                  window.location.href = `mailto:${userData.userEmail}`;
                }
              }}
            />
          </div>
          {roleChecker && (
            <div onClick={handleEnableEdit} className={styles.edit_box}>
              <Icon color="blue" icon="EditIcon" />
              <p className={styles.edit_text}>Изменить данные</p>
            </div>
          )}
        </div>
        <div className={styles.container}>
          <div className={styles.element_box}>
            <h2
              className={classNames(
                'text',
                'text_size_large',
                'text_type_regular',
                styles.title
              )}
            >
              Страница VK
            </h2>
            <input
              type="text"
              className={styles.input}
              onChange={onChange}
              name="userVKLink"
              defaultValue={userData.userVKLink}
              readOnly={!enableEdit}
              onClick={(e) => {
                if (!enableEdit) {
                  e.preventDefault();
                  window.location.href = `${userData.userVKLink}`;
                }
              }}
            />
          </div>
          {roleChecker && (
            <div onClick={handleEnableEdit} className={styles.edit_box}>
              <Icon color="blue" icon="EditIcon" />
              <p className={styles.edit_text}>Изменить данные</p>
            </div>
          )}
        </div>
        {roleChecker && (
          <Button
            buttonType="primary"
            label="Сохранить"
            disabled={!enableEdit}
            type="submit"
          />
        )}
      </form>
    </>
  );
}
