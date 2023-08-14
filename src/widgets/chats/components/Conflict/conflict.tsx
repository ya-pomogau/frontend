import styles from './styles.module.css';
import classnames from 'classnames';
import { CloseCrossIcon } from '../../../../shared/ui/icons/close-cross-icon';
import { ConflictUserCard } from '../../../../shared/ui/conflict-user-card';
import { CategoriesBackground } from '../../../../shared/ui/categories-background';
import { Button } from '../../../../shared/ui/button';
import { EmptyMessageIcon } from '../../../../shared/ui/icons/empty-message-icon';

export const Conflict = () => {
  return (
    <div className={styles.wrapper}>
      <div className={classnames('text', 'text_size_large', styles.heading)}>
        Конфликт
        <CloseCrossIcon color={'blue'} />
      </div>
      <div className={styles.conflict}>
        <div className={styles.users}>
          <ConflictUserCard
            role={'Волонтер'}
            userName={'Петров Петр Петрович'}
            userId={11111114}
            avatarLink={'https://i.pravatar.cc/300'}
            avatarName={'avatar'}
          />
          <ConflictUserCard
            role={'Реципиент'}
            userName={'Петров Петр Петрович'}
            userId={11111114}
            avatarLink={'https://i.pravatar.cc/300'}
            avatarName={'avatar'}
          />
        </div>
        <div className={styles.information}>
          <p className={classnames('text', 'text_size_large', styles.date)}>
            24.09.2022
            <p className={classnames(styles.time)}>16:00</p>
          </p>
          <p className={classnames('text', 'text_size_medium', styles.address)}>
            ул. Нахимова, д.9, у подъезда №3
          </p>
          <CategoriesBackground theme={'primary'} content={'Сопровождение'} />
          <p
            className={classnames(
              'text',
              'text_size_medium',
              styles.description
            )}
          >
            Заболел и совсем нет сил даже ходить по квартире. Почти неделю
            собаку выгуливали соседи, но в пятницу они не смогут. Помогите,
            пожалуйста!
          </p>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          buttonType={'secondary'}
          label={'Конфликт решен'}
          extClassName={classnames('text', 'text_size_small', styles.button)}
        />
        <Button
          customIcon={<EmptyMessageIcon color={'white'} />}
          buttonType="primary"
          label="Ответить"
          size="medium"
          extClassName={classnames('text', 'text_size_medium', styles.button)}
          disabled={false}
        />
      </div>
    </div>
  );
};
