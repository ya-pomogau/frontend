import cn from 'classnames';
import { SquareButton } from '../square-buttons';
import styles from './styles.module.css';
import { RoundButton } from '../round-button';

interface PropsConflictCard {
  optionCard: 'conflict' | 'confirm';
  specialization: 'valanter' | 'recipient';
  name: string;
  image: string;
  id: string;
  onClickPhone?: () => void;
  onClickMessage?: () => void;
}

export function ConflictCard({
  optionCard,
  specialization,
  name,
  image,
  id,
}: PropsConflictCard) {
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
      {image ? (
        <img className={styles.img} src={image} alt="фото" />
      ) : (
        <div className={styles.img} />
      )}
      <div className={styles.conteiner}>
        <RoundButton buttonType="phone" />
        <RoundButton buttonType="message" />
      </div>
      <h5 className={cn('text', 'text_type_regular', styles.name)}>{name}</h5>
      <p className={cn('text_type_regular', 'text', styles.id)}>{`ID ${id}`}</p>
    </article>
  );
}
