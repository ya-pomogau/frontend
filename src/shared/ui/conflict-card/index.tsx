import cn from 'classnames';
import { SquareButton } from '../square-buttons';
import styles from './styles.module.css';
import { RoundButton } from '../round-button';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ModalContent } from 'widgets/task-buttons-content';
import { modalContentType, taskButtonType } from 'shared/types/common.types';
import { TaskReport } from 'entities/task/types';

interface IUser {
  address: string;
  avatar: string;
  name: string;
  phone: string;
  _id: string;
  vkId: string;
}

interface PropsConflictCard {
  user: IUser;
  role: 'recipient' | 'volunteer';
  status: TaskReport;
}

export function ConflictCard({ user, role, status }: PropsConflictCard) {
  const handelClickChat = () => {
    window.open(user.vkId, '_blank');
  };

  return (
    <article className={styles.conflictCard}>
      <SquareButton
        extClassName={styles.icon}
        buttonType={status === 'rejected' ? 'conflict' : 'confirm'}
      />
      <h4
        className={cn(
          'm-0',
          'text',
          'text_type_bold',
          'text_size_small',
          styles.specialization
        )}
      >
        {role === 'volunteer' ? 'Волонтер' : 'Реципиент'}
      </h4>
      <img className={styles.img} src={user.avatar} alt="фото" />
      <div className={styles.conteiner}>
        <ButtonWithModal
          modalContent={<ModalContent type={modalContentType.phone} />}
        >
          <RoundButton buttonType={taskButtonType.phone} />
        </ButtonWithModal>
        <RoundButton buttonType="message" onClick={handelClickChat} />
      </div>
      <h5 className={cn('text', 'text_type_regular', styles.name)}>
        {user.name}
      </h5>
      <p
        className={cn('text_type_regular', 'text', styles.id)}
      >{`ID ${user._id}`}</p>
    </article>
  );
}
