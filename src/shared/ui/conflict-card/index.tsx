import { SquareButton } from '../square-buttons';
import styles from './styles.module.css';
import { RoundButton } from '../round-button';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ModalContent } from 'widgets/task-buttons-content';
import { modalContentType, taskButtonType } from 'shared/types/common.types';
import { TaskReport } from 'entities/task/types';
import { Typography } from '../typography';

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
      <Typography
        tag={'h4'}
        color={'black'}
        fontFamily={'primaryFont'}
        variant={'support-bold'}
        content={role === 'volunteer' ? 'Волонтер' : 'Реципиент'}
        extraClass={styles.specialization}
      />
      <img className={styles.img} src={user.avatar} alt="фото" />
      <div className={styles.conteiner}>
        <ButtonWithModal
          modalContent={<ModalContent type={modalContentType.phone} />}
        >
          <RoundButton buttonType={taskButtonType.phone} />
        </ButtonWithModal>
        <RoundButton buttonType="message" onClick={handelClickChat} />
      </div>
      <Typography
        tag={'h5'}
        fontFamily={'primaryFont'}
        color={'black'}
        variant={'paragraphResize'}
        content={user.name}
        extraClass={styles.name}
      />
      <Typography
        tag={'p'}
        fontFamily={'primaryFont'}
        color={'ID-text'}
        variant={'servicesText'}
        content={`ID ${user._id}`}
        extraClass={styles.id}
      />
    </article>
  );
}
