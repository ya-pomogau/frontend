import classnames from 'classnames';

import { MessageInterface } from 'shared/types/chat.types';
import {
  InputWrapper,
  GradientDivider,
  Typography,
  Icon,
  Avatar,
  SquareButton,
} from 'shared/ui';
import { useMediaQuery, useForm } from 'shared/hooks';
import { AnyUserInterface } from 'shared/types/user.type';
import { Breakpoints } from 'shared/config';
import { MessagesList } from './components/messages-list';

import styles from './styles.module.css';

interface PopupChatProps {
  messages: MessageInterface[];
  chatmateInfo: AnyUserInterface;
  onAttachFileClick: () => void;
  onMessageSend?: (message: string) => void;
  isOpen: boolean;
  onClick: () => void;
}

export const PopupChat = ({
  messages,
  chatmateInfo,
  onMessageSend,
  isOpen,
  onClick,
}: PopupChatProps) => {
  const isMobile = useMediaQuery(Breakpoints.S);

  const { values, handleChange, resetForm } = useForm({
    message: '',
  });

  const handleSendClick = () => {
    if (onMessageSend) {
      onMessageSend(values.message);
      resetForm();
    }
  };

  return (
    <div
      className={classnames(styles.chatWrapper, {
        [styles.chatWrapper_action]: isOpen,
      })}
    >
      {!isMobile && (
        <SquareButton
          buttonType="close"
          onClick={onClick}
          extClassName={styles['btn-close']}
        />
      )}

      <div className={styles.mainBlock}>
        {isMobile && (
          <Icon
            color="blue"
            icon="ArrowIcon"
            size="32"
            className={styles.arrow}
            onClick={onClick}
          />
        )}
        <Avatar
          avatarName="Фотография собеседника"
          avatarLink={chatmateInfo.avatar}
          size={'medium'}
        />
        <div className={styles.chatmateInfo}>
          <Typography
            tag={'h4'}
            variant={'titleResize'}
            content={chatmateInfo.name}
          />
          {!isMobile && (
            <Typography variant={'paragraph-bold'}>
              Тел:{' '}
              <Typography
                tag={'span'}
                content={chatmateInfo.phone}
                extraClass={styles.chatmatePhone}
              />
            </Typography>
          )}
        </div>
      </div>
      {isMobile && <GradientDivider extClassName={styles.border} />}
      <div className={styles['container-chat']}>
        <MessagesList messages={messages} chatmateInfo={chatmateInfo} />

        <InputWrapper
          extClassInput={classnames({
            [styles.input_inner_mobile]: isMobile && isOpen,
          })}
          extClass={classnames({
            [styles.input_container_mobile]: isMobile && isOpen,
          })}
          customIconSize={isMobile ? '32' : '24'}
          getFile={() => {}}
          placeholder="Напишите сообщение..."
          inputValue={values.message}
          name="message"
          onChange={handleChange}
          onClickBtn={handleSendClick}
          containerMessages={false}
        />
      </div>
    </div>
  );
};
