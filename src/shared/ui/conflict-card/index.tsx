import cn from 'classnames';
import { SquareButton } from '../square-buttons';
import styles from './styles.module.css';
import { RoundButton } from '../round-button';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { ModalContent } from 'widgets/task-buttons-content';
import { ModalContentType, TaskButtonType } from 'shared/types/common.types';

interface PropsConflictCard {
  optionCard: 'conflict' | 'confirm';
  specialization: 'valanter' | 'recipient';
  name: string;
  image: string;
  id: string;
  onClickPhone?: () => void;
  onClickMessage?: () => void;
  // TODO conflict
  vkId?: string;
}

export function ConflictCard({
  optionCard,
  specialization,
  name,
  image,
  id,
  vkId,
}: PropsConflictCard) {
  // TODO conflict
  const handelMessage = () => {
    window.open(vkId, '_blank');
  };
  // TODO conflict
  return (
    <article className={styles['conflict-cart']}>
      <SquareButton
        extClassName={styles.icon}
        buttonType={optionCard === 'conflict' ? 'conflict' : 'confirm'}
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
        {specialization === 'valanter' ? 'Волонтер' : 'Реципиент'}
      </h4>
      <img className={styles.img} src={image} alt="фото" />
      <div className={styles.conteiner}>
        {/* TODO conflict */}
        <ButtonWithModal
          modalContent={<ModalContent type={ModalContentType.phone} />}
        >
          <RoundButton
            buttonType={TaskButtonType.phone}
            // disabled={isPageCompleted || !user ? true : false}
          />
        </ButtonWithModal>
        <RoundButton buttonType="message" onClick={handelMessage} />
      </div>
      <h5 className={cn('text', 'text_type_regular', styles.name)}>{name}</h5>
      <p className={cn('text_type_regular', 'text', styles.id)}>{`ID ${id}`}</p>
    </article>
  );
}
