import classNames from 'classnames';
import { useState } from 'react';
import Checkbox from 'shared/ui/checkbox';
import styles from './styles.module.css';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { Button } from 'shared/ui/button';
import { ButtonType, ReasonType } from './types';
import { format } from 'date-fns';
import { textStyle, titleStyle } from './utils';

interface ModalContentProps {
  type: ButtonType;
  active?: boolean;
  conflict?: boolean;
  date?: string;
}

export const ModalContent = ({
  type,
  active = true,
  conflict = true,
  date,
}: ModalContentProps) => {
  const [reason, setReason] = useState<ReasonType | null>(null);
  switch (type) {
    case ButtonType.close:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Укажите причину отмены</h3>
          <div className={classNames(styles.modalContent, styles.flexColumn)}>
            <Checkbox
              label="Не смогу прийти"
              id={ReasonType.first}
              onChange={() => setReason(ReasonType.first)}
              checked={reason === ReasonType.first}
            />
            <Checkbox
              label="Отмена по обоюдному согласию"
              id={ReasonType.second}
              onChange={() => setReason(ReasonType.second)}
              checked={reason === ReasonType.second}
            />
            <Checkbox
              label="Не могу указать причину"
              id={ReasonType.third}
              onChange={() => setReason(ReasonType.third)}
              checked={reason === ReasonType.third}
            />
          </div>
          <div className={styles.modalButtons}>
            <Button
              buttonType="secondary"
              label="Помощь администратора"
              onClick={() => 1}
            />
            <ButtonWithModal
              modalContent={<ModalContent type={ButtonType.cancel} />}
            >
              <Button buttonType="primary" label="Отменить заявку" />
            </ButtonWithModal>
          </div>
        </div>
      );
    case ButtonType.conflict:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>
            {active
              ? 'Подтвердите, что заявка не выполнена'
              : conflict
              ? 'Не выполнена'
              : 'Выполнена'}
          </h3>
          {active && (
            <>
              <div className={classNames(styles.modalContent, styles.flexRow)}>
                <Button buttonType="secondary" label="Отменить" />
                <Button buttonType="primary" label="Подтвердить" />
              </div>
              <div className={styles.modalButtons}>
                <Button
                  buttonType="secondary"
                  label="Помощь администратора"
                  onClick={() => 1}
                />
              </div>
            </>
          )}
        </div>
      );
    case ButtonType.confirm:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Благодарим за отзывчивость</h3>
          <p className={textStyle}>
            {active
              ? 'Мы ждем ответ рецепиента'
              : date
              ? format(new Date(date), 'dd.MM.yyyy hh:mm')
              : ''}
          </p>
        </div>
      );
    case ButtonType.phone:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Номер телефона:</h3>
          <a className={textStyle} href="tel: +7 (800) 555-35-35">
            +7 (800) 555-35-35
          </a>
        </div>
      );
    case ButtonType.cancel:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>До начала заявки менее 24 часа</h3>
          <p className={textStyle}>
            Вы не можете отменить заявку самостоятельно.
          </p>
          <div className={styles.modalButtons}>
            <Button buttonType="primary" label="Написать администратору" />
          </div>
        </div>
      );
  }
};
