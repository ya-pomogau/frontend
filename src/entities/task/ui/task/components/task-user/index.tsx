import { TaskButtonType } from 'shared/types/common.types';
import { Avatar } from 'shared/ui/avatar';
import { ButtonWithModal } from 'widgets/button-with-modal';
import styles from './styles.module.css';
import { ModalContent } from 'widgets/task-buttons-content';
import { RoundButton } from 'shared/ui/round-button';
import classNames from 'classnames';
import { useMediaQuery } from 'shared/hooks';
import placeholder from '../../img/placeholder.svg';
import { DefaultAvatar } from '../../img/default-avatar';
import { TaskStatus } from 'entities/task/types';
import { UserProfile } from 'entities/user/types';
import { useLocation } from 'react-router-dom';

interface TaskUserProps {
  user: UserProfile | null;
  extClassName?: string;
  date: string | null;
}
export const TaskUser = ({ user, extClassName, date }: TaskUserProps) => {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:1150px)');
  const isPageActive = location.pathname === '/profile/completed';
  return (
    <div className={classNames(extClassName, styles.main)}>
      {user !== null ? (
        <>
          <Avatar
            avatarName={user.name || 'Пользователь не назначен'}
            avatarLink={user.avatar ? user.avatar : placeholder}
            extClassName={styles.avatar}
          />
          <div className={styles.info}>
            <p
              className={`${
                isMobile
                  ? `m-0 text_type_regular ${styles.name}`
                  : 'm-0 text_size_medium'
              }`}
            >
              {user.name}
            </p>
            <p className={`${!isMobile && styles.phone} m-0 text_size_medium`}>
              {user.phone}
            </p>
          </div>
          <div className={styles.buttons}>
            <ButtonWithModal
              modalContent={
                <ModalContent type={TaskButtonType.phone} date={date} />
              }
            >
              <RoundButton
                buttonType={TaskButtonType.phone}
                disabled={isPageActive ? true : false}
              />
            </ButtonWithModal>
            <RoundButton
              buttonType="message"
              disabled={isPageActive ? true : false}
            />
          </div>
        </>
      ) : (
        <>
          <DefaultAvatar isTaskAvatar />
          <div className={styles.buttons}>
            <ButtonWithModal
              modalContent={
                <ModalContent type={TaskButtonType.phone} date={date} />
              }
            >
              <RoundButton
                buttonType={TaskButtonType.phone}
                disabled={!user ? true : false}
              />
            </ButtonWithModal>
            <RoundButton buttonType="message" disabled={!user ? true : false} />
          </div>
        </>
      )}
    </div>
  );
};
