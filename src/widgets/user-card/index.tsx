import { ChangeEvent, ReactNode, useState } from 'react';
import classnames from 'classnames';

import { Avatar } from '../../shared/ui/avatar';

import styles from './styles.module.css';
import { RoundButton } from '../../shared/ui/round-button';
import { VolunteerInfo } from 'entities/user/ui/user-info/volunteer-info';
import { Button } from '../../shared/ui/button';
import { Input } from '../../shared/ui/input';
import { ExclamationPointIcon } from '../../shared/ui/icons/exclamation-point-icon';
import { EditIcon } from 'shared/ui/icons/edit-icon';
import { ArrowDownIcon } from 'shared/ui/icons/arrow-down-icon';
import Checkbox from 'shared/ui/checkbox';

interface UserCardProps {
  role?: 'volunteer' | 'recipient' | 'admin' | 'master';
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId: number;
  userNumber: string;
  children?: ReactNode;
  volunteerInfo?: any;
}

// Данные берутся из БД по id
const volunteerInfoMock = {
  approved: true,
  checked: false,
  keys: false,
  adminStatus: null,
  scores: 30,
};

const getButtonTypeFromScore = (
  score: number
): 'primary' | 'partial' | 'secondary' => {
  if (score < 30) {
    return 'primary';
  } else if (score < 60) {
    return 'partial';
  } else {
    return 'secondary';
  }
};

export const UserCard = ({
  role,
  extClassName,
  avatarLink,
  avatarName,
  userName,
  userId,
  userNumber,
  children,
  volunteerInfo = {
    approved: true,
    checked: false,
    keys: false,
    adminStatus: null,
    scores: 30,
  },
}: UserCardProps) => {
  const [recipientInputValue, setRecipientInputValue] = useState('');
  const [isAdminDropdownListClosed, setAdminDropdownListClosed] =
    useState(true);

  const { approved, checked, scores, keys } = volunteerInfo;

  const isVolonteerAcceptButtonDisabled =
    (scores === 0 && approved) ||
    (scores >= 30 && scores < 60 && checked) ||
    scores >= 60;

  const isAcceptButtonExclamationPointIcon =
    scores >= 30 && !checked && scores < 60;

  const isKeyButtonExclamationPointIcon = scores >= 60 && !checked && !keys;

  const isKeysNullOrOne = keys ? 1 : null;

  return (
    <div
      className={classnames(
        styles.content,
        extClassName,
        role === 'admin' && styles.admin_content
      )}
    >
      <Avatar
        extClassName={styles.avatar}
        avatarName={avatarName}
        avatarLink={avatarLink}
      />
      <div className={classnames(styles.icons_div)}>
        <RoundButton
          buttonType="phone"
          onClick={() => console.log('call button pressed')}
        />
        <RoundButton
          buttonType="message"
          onClick={() => console.log('message button pressed')}
        />
      </div>
      <div className={styles.user_info}>
        <h2
          className={classnames(
            styles.name_text,
            'm-0 text text_size_medium text_type_regular'
          )}
        >
          {userName}
        </h2>
        {role === 'recipient' && (
          <div className={classnames(styles.grid_two, styles.id_color)}>
            <p className="m-0 text text_size_small text_type_regular"> ID </p>
            <p className="m-0 text text_size_small text_type_regular">
              {userId}
            </p>
          </div>
        )}
        <div className={styles.grid_two}>
          <p className="m-0 text text_size_small text_type_bold "> тел: </p>
          <p className="m-0 text text_size_small text_type_regular">
            {userNumber}
          </p>
        </div>
      </div>

      {role === 'volunteer' && (
        <div className={classnames(styles.buttons_div)}>
          <div className={classnames(styles.volunteer_info)}>
            <VolunteerInfo
              extClassName={styles.customVolunteerInfo}
              score={scores}
              hasKey={isKeysNullOrOne}
            />
          </div>
          <div className={classnames(styles.exclamation_point_div)}>
            {/* При нажатии этой кнопки в Api - если buttonType == primary, то 'approved' меняется на 'true' и checked: true; если buttonType == partial, то checked меняем true */}
            {/* В бэкенде надо прописать, что когда score меняется с 29 на 30 надо checked поменять на false */}
            <Button
              disabled={isVolonteerAcceptButtonDisabled}
              buttonType={getButtonTypeFromScore(scores)}
              label="Подтвердить"
              onClick={() => console.log('"подтвердить" button pressed')}
            />
            {isAcceptButtonExclamationPointIcon && <ExclamationPointIcon />}
          </div>
          {/* При нажатии этой кнопки в Api -У пользователя пропадает доступ к ЛК, Карточка пользователя опускается вниз списка */}
          <Button
            buttonType="secondary"
            label="Заблокировать"
            onClick={() => console.log('"Заблокировать" button pressed')}
          />
          <div className={classnames(styles.exclamation_point_div)}>
            {/* При нажатии этой кнопки в Api -'keys' меняется на 'true' */}
            <Button
              buttonType="secondary"
              label="Дать ключи"
              onClick={() => console.log('"Дать ключи" button pressed')}
            />
            {isKeyButtonExclamationPointIcon && <ExclamationPointIcon />}{' '}
          </div>
        </div>
      )}

      {role === 'recipient' && (
        <div className={classnames(styles.buttons_div)}>
          <Input
            className={classnames(styles.recipient_input)}
            name="name"
            onChange={(e) => {
              setRecipientInputValue(e.target.value);
            }}
            value={recipientInputValue}
            placeholder="Впишите вашу фамилию"
            type="text"
          />
          <Button
            disabled={approved}
            buttonType={recipientInputValue ? 'primary' : 'secondary'}
            label="Подтвердить"
            onClick={() => console.log('"Подтвердить" button pressed')}
          />
          {/* При нажатии этой кнопки в Api -У пользователя пропадает доступ к ЛК, Карточка пользователя опускается вниз списка */}
          <Button
            buttonType="secondary"
            label="Заблокировать"
            onClick={() => console.log('"Заблокировать" button pressed')}
          />
        </div>
      )}

      {role === 'admin' && (
        <div className={classnames(styles.buttons_div)}>
          <Input
            className={classnames(styles.admin_login_input)}
            label="Логин"
            name="login"
            onChange={(e) => {
              console.log(e);
            }}
            value={'Login'}
            placeholder="Логин"
            type="text"
          />
          <div className={classnames(styles.admin_password_box)}>
            <Input
              className={classnames(styles.admin_password_input)}
              label="Пароль"
              name="password"
              onChange={(e) => {
                console.log(e);
              }}
              value={'Пароль'}
              placeholder="Пароль"
              type="password"
            />
            <EditIcon
              className={classnames(styles.admin_edit_icon)}
              color={'blue'}
            ></EditIcon>{' '}
          </div>

          {isAdminDropdownListClosed && (
            <>
              <div className={classnames(styles.admin_save_btn)}>
                <Button
                  buttonType="primary"
                  label="Сохранить"
                  onClick={() => console.log('"Сохранить" button pressed')}
                />
              </div>
              <div
                className={classnames(styles.admin_dropdown_list_closed_box)}
              >
                <div
                  className={classnames(styles.admin_arrow_down)}
                  onClick={() => setAdminDropdownListClosed(false)}
                >
                  <ArrowDownIcon color={'blue'} />
                </div>
              </div>
            </>
          )}
          {!isAdminDropdownListClosed && (
            <div className={classnames(styles.admin_dropdown_list_opened_box)}>
              <div
                className={classnames(styles.admin_arrow_up)}
                onClick={() => setAdminDropdownListClosed(true)}
              >
                <ArrowDownIcon color={'blue'} />
              </div>{' '}
              <div className={classnames(styles.admin_checkboxes)}>
                <Checkbox label={'Подтверждать аккаунты'} />
                <Checkbox label={'Создавать заявки'} />
                <Checkbox label={'Раздавать ключи'} />
                <Checkbox label={'Решать споры'} />
                <Checkbox label={'Контент блог'} />
                <Checkbox label={'Повышение балов'} />
              </div>
              <div className={classnames(styles.admin_block_btn)}>
                <Button
                  buttonType="secondary"
                  label="Заблокировать"
                  onClick={() => console.log('"Заблокировать" button pressed')}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
