import classNames from 'classnames';
import { useState } from 'react';
import Checkbox from 'shared/ui/checkbox';
import styles from './styles.module.css';
import { ButtonWithModal } from 'widgets/button-with-modal';
import { Button } from 'shared/ui/button';
import { ReasonType } from './types';
import { format } from 'date-fns';
import { textStyle, titleStyle } from './utils';
import { TaskButtonType, UserRole } from 'shared/types/common.types';

interface ModalContentProps {
  type: TaskButtonType;
  active?: boolean;
  conflict?: boolean;
  date: string | null;
  role?: UserRole | null;
}

export const ModalContent = ({
  type,
  active = true,
  conflict = true,
  date,
  role,
}: ModalContentProps) => {
  const [reason, setReason] = useState<ReasonType | null>(null);
  switch (type) {
    case TaskButtonType.close:
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
            {/* <ButtonWithModal
              modalContent={
                <ModalContent type={TaskButtonType.close} date={date} />
              }
            > */}
            <Button
              buttonType="primary"
              label="Отменить заявку"
              onClick={() => 2}
            />
            {/* </ButtonWithModal> */}
          </div>
        </div>
      );
    case TaskButtonType.conflict:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>
            {active
              ? 'Подтвердите, что заявка не выполнена'
              : conflict
              ? 'Не выполнена'
              : 'Выполнена'}
          </h3>
          {
            <>
              {active && (
                <div
                  className={classNames(styles.modalContent, styles.flexRow)}
                >
                  <Button buttonType="secondary" label="Отменить" />
                  <Button buttonType="primary" label="Подтвердить" />
                </div>
              )}
              {(active || !conflict) && (
                <div className={styles.modalButtons}>
                  <Button
                    buttonType="secondary"
                    label={
                      active
                        ? 'Помощь администратора'
                        : 'Написать администратору'
                    }
                    onClick={() => 1}
                  />
                </div>
              )}
            </>
          }
        </div>
      );
    case TaskButtonType.confirm:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Благодарим за отзывчивость</h3>
          <p className={textStyle}>
            {active
              ? `Мы ждем ответ ${
                  role === UserRole.RECIPIENT ? 'от волонтера' : 'от реципиента'
                }`
              : date
              ? format(new Date(date), 'dd.MM.yyyy hh:mm')
              : ''}
          </p>
        </div>
      );
    case TaskButtonType.phone:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>Номер телефона:</h3>
          <a className={textStyle} href="tel: +7 (800) 555-35-35">
            +7 (800) 555-35-35
          </a>
        </div>
      );
    case TaskButtonType.cancel:
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
    case TaskButtonType.responded:
      return (
        <div className={styles.modalTooltip}>
          <h3 className={titleStyle}>На заявку откликнулись</h3>
          <p className={textStyle}>
            Вы не можете отменить или отредактировать заявку самостоятельно.
          </p>
          <div className={styles.modalButtons}>
            <Button buttonType="primary" label="Написать администратору" />
          </div>
        </div>
      );
  }
};
