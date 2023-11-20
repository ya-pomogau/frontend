import styles from './styles.module.css';
import classnames from 'classnames';
import { CloseCrossIcon } from '../../../../shared/ui/icons/close-cross-icon';
import { ConflictUserCard } from '../../../../shared/ui/conflict-user-card';
import { CategoriesBackground } from '../../../../shared/ui/categories-background';
import { Button } from '../../../../shared/ui/button';
import { EmptyMessageIcon } from '../../../../shared/ui/icons/empty-message-icon';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchConflictList, getSelectedConflict } from '../../model/conflict';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { LightPopup } from '../../../../shared/ui/light-popup';
import { ArrowIcon } from '../../../../shared/ui/icons/arrow-icon';
import { CalendarIcon } from '../../../../shared/ui/icons/calendar-icon';
import { ClockIcon } from '../../../../shared/ui/icons/clock-icon';
import { LocationIcon } from '../../../../shared/ui/icons/location-icon';

interface IConflictProps {
  onClose: () => void;
  isMobile: boolean;
}

export const Conflict = ({ onClose, isMobile }: IConflictProps) => {
  const { conflictId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConflictList());
  }, []);

  const conflictState = useAppSelector((state) => state.conflicts);
  const selectedConflict = getSelectedConflict(conflictState, conflictId ?? '');

  return (
    <>
      {isMobile ? (
        <LightPopup
          extClassName={styles.popUp}
          onClickExit={onClose}
          isPopupOpen={true}
        >
          <>
            {selectedConflict && (
              <div className={styles.wrapper}>
                <div className={styles.info}>
                  <ArrowIcon size={'32'} onClick={onClose} color={'blue'} />
                  <span className={classnames('text', 'text_size_large')}>
                    Конфликт
                  </span>
                </div>
                <div className={styles.line}></div>
                <div className={styles.conflict}>
                  <div className={styles.users}>
                    <ConflictUserCard
                      role={selectedConflict.volunteer.role}
                      userName={selectedConflict.volunteer.userName}
                      userId={selectedConflict.volunteer.userId}
                      avatarLink={selectedConflict.volunteer.avatarLink}
                      avatarName={selectedConflict.volunteer.avatarName}
                      isMobile={isMobile}
                    />
                    <ConflictUserCard
                      role={selectedConflict.recipient.role}
                      userName={selectedConflict.recipient.userName}
                      userId={selectedConflict.recipient.userId}
                      avatarLink={selectedConflict.recipient.avatarLink}
                      avatarName={selectedConflict.recipient.avatarName}
                      isMobile={isMobile}
                    />
                  </div>
                  <div className={styles.information}>
                    <div
                      className={classnames(
                        'text',
                        'text_size_medium',
                        'text_type_bold',
                        styles.date
                      )}
                    >
                      <CalendarIcon color={'blue'} size={'17'} />
                      24.09.2022
                      <div className={classnames(styles.time)}>
                        <ClockIcon color={'blue'} size={'17'} />
                        16:00
                      </div>
                    </div>
                    <div
                      className={classnames(
                        'text',
                        'text_size_medium',
                        'text_type_bold',
                        styles.address
                      )}
                    >
                      <LocationIcon color={'blue'} size={'17'} />
                      {selectedConflict.address}
                    </div>
                    <CategoriesBackground
                      theme={'primary'}
                      content={selectedConflict.theme}
                    />
                    <p
                      className={classnames(
                        'text',
                        'text_size_medium',
                        styles.description
                      )}
                    >
                      {selectedConflict.description}
                    </p>
                  </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.buttons}>
                  <Button
                    buttonType={'secondary'}
                    label={'Конфликт решен'}
                    extClassName={classnames(
                      'text',
                      'text_size_small',
                      styles.button
                    )}
                  />
                  <Button
                    customIcon={<EmptyMessageIcon color={'white'} />}
                    buttonType="primary"
                    label="Ответить"
                    size="medium"
                    extClassName={classnames(
                      'text',
                      'text_size_medium',
                      styles.button
                    )}
                    disabled={false}
                  />
                </div>
              </div>
            )}
          </>
        </LightPopup>
      ) : (
        selectedConflict && (
          <div className={styles.wrapper}>
            <div
              className={classnames('text', 'text_size_large', styles.heading)}
            >
              Конфликт
              <CloseCrossIcon color={'blue'} onClick={onClose} />
            </div>
            <div className={styles.conflict}>
              <div className={styles.users}>
                <ConflictUserCard
                  role={selectedConflict.volunteer.role}
                  userName={selectedConflict.volunteer.userName}
                  userId={selectedConflict.volunteer.userId}
                  avatarLink={selectedConflict.volunteer.avatarLink}
                  avatarName={selectedConflict.volunteer.avatarName}
                  isMobile={isMobile}
                />
                <ConflictUserCard
                  role={selectedConflict.recipient.role}
                  userName={selectedConflict.recipient.userName}
                  userId={selectedConflict.recipient.userId}
                  avatarLink={selectedConflict.recipient.avatarLink}
                  avatarName={selectedConflict.recipient.avatarName}
                  isMobile={isMobile}
                />
              </div>
              <div className={styles.information}>
                <div
                  className={classnames('text', 'text_size_large', styles.date)}
                >
                  24.09.2022
                  <p className={classnames(styles.time)}>16:00</p>
                </div>
                <p
                  className={classnames(
                    'text',
                    'text_size_medium',
                    styles.address
                  )}
                >
                  {selectedConflict.address}
                </p>
                <CategoriesBackground
                  theme={'primary'}
                  content={selectedConflict.theme}
                />
                <p
                  className={classnames(
                    'text',
                    'text_size_medium',
                    styles.description
                  )}
                >
                  {selectedConflict.description}
                </p>
              </div>
              <div className={styles.buttons}>
                <Button
                  buttonType={'secondary'}
                  label={'Конфликт решен'}
                  extClassName={classnames(
                    'text',
                    'text_size_small',
                    styles.button
                  )}
                />
                <Button
                  customIcon={<EmptyMessageIcon color={'white'} />}
                  buttonType="primary"
                  label="Ответить"
                  size="medium"
                  extClassName={classnames(
                    'text',
                    'text_size_medium',
                    styles.button
                  )}
                  disabled={false}
                />
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};
