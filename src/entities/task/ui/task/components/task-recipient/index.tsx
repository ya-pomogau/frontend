import { TaskButtonType } from 'shared/types/common.types';
import { Avatar } from 'shared/ui/avatar';
import { ButtonWithModal } from 'widgets/button-with-modal';
import styles from './styles.module.css';
import { ModalContent } from 'widgets/task-buttons-content';
import { RoundButton } from 'shared/ui/round-button';
import classNames from 'classnames';
import { useMediaQuery } from 'shared/hooks';

interface TaskRecipientProps {
  avatar: string;
  recipientName?: string;
  recipientPhoneNumber?: string;
  connection: boolean;
  unreadMessages?: number;
  extClassName?: string;
}

export const TaskRecipient = ({
  avatar,
  recipientName,
  recipientPhoneNumber,
  connection = true,
  unreadMessages,
  extClassName,
}: TaskRecipientProps) => {
  const isMobile = useMediaQuery('(max-width:1150px)');
  return (
    <div className={classNames(extClassName, styles.main)}>
      <Avatar
        avatarName={recipientName || 'Пользователь не назначен'}
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
          {recipientName}
        </p>
        <p className={`${!isMobile && styles.phone} m-0 text_size_medium`}>
          {recipientPhoneNumber}
        </p>
      </div>

      <div className={styles.buttons}>
        <ButtonWithModal
          modalContent={<ModalContent type={TaskButtonType.phone} />}
        >
          <RoundButton
            buttonType={TaskButtonType.phone}
            disabled={connection}
          />
        </ButtonWithModal>
        <RoundButton
          buttonType="message"
          disabled={connection}
          unreadMessages={unreadMessages}
        />
      </div>
    </div>
  );
};
