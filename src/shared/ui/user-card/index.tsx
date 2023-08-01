import { ChangeEvent, ReactNode } from 'react';
import classnames from 'classnames';

import { Avatar } from '../avatar';

import styles from './styles.module.css';
import { RoundButton } from '../round-button';
import { VolunteerInfo } from 'entities/user/ui/user-info/volunteer-info';
import { PartialFill } from '../button/button.stories';
import { Button } from '../button';
import { Input } from '../input';

interface UserCardProps {
  role?: 'volunteer' | 'recipient' | 'admin' | 'master' | 'unprocessed';
  extClassName?: string;
  avatarLink: string;
  avatarName: string;
  userName: string;
  userId?: number;
  userNumber: string;
  children?: ReactNode;
}

export const UserCard = ({
  role,
  extClassName,
  avatarLink = 'https://i.pravatar.cc/300',
  avatarName,
  userName,
  userId,
  userNumber,
  children,
}: UserCardProps) => (
  <div className={classnames(styles.content, extClassName)}>
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
      <h2 className="m-0 text text_size_medium text_type_regular">
        {userName}
      </h2>
      {role === 'recipient' && (
        <div className={classnames(styles.grid_two, styles.id_color)}>
          <p className="m-0 text text_size_small text_type_regular"> ID </p>
          <p className="m-0 text text_size_small text_type_regular">{userId}</p>
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
            score={0}
            hasKey={1}
          />
        </div>
        <Button buttonType="partial" label="Подтвердить" />
        <Button buttonType="secondary" label="Заблокировать" />
        <Button buttonType="secondary" label="Дать ключи" />
      </div>
    )}
    {role === 'recipient' && (
      <div className={classnames(styles.buttons_div)}>
        <Input
          name="email"
          onChange={(e) => {
            console.log(e);
          }}
          value={''}
          placeholder="Впишите вашу фамилию"
          type="text"
        />
        <Button buttonType="secondary" label="Проверить" />
        <Button buttonType="secondary" label="Заблокировать" />
      </div>
    )}
    {children}
  </div>
);
