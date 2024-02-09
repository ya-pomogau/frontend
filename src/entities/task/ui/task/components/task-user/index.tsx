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

interface TaskUserProps {
  avatar: string;
  name?: string;
  phone?: string;
  connection: boolean;
  extClassName?: string;
  date: string | null;
  status: TaskStatus;
}
export const TaskUser = ({
  avatar = placeholder,
  name,
  phone,
  connection,
  extClassName,
  date,
  status,
}: TaskUserProps) => {
  const isMobile = useMediaQuery('(max-width:1150px)');

  return (
    <div className={classNames(extClassName, styles.main)}>
      {connection ? (
        <>
          <Avatar
            avatarName={name || 'Пользователь не назначен'}
            avatarLink={avatar}
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
              {name}
            </p>
            <p className={`${!isMobile && styles.phone} m-0 text_size_medium`}>
              {phone}
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
                disabled={status === TaskStatus.COMPLETED ? true : false}
              />
            </ButtonWithModal>
            <RoundButton
              buttonType="message"
              disabled={status === TaskStatus.COMPLETED ? true : false}
            />
          </div>
        </>
      ) : (
        <DefaultAvatar isTaskAvatar />
      )}
    </div>
  );
};
