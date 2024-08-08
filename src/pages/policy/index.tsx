import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { initTitleMarkdown, initDescriptionMarkdown } from './content';
import styles from './markdown-style.module.css';
import { EditIcon } from '../../shared/ui/icons/edit-icon';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Button } from '../../shared/ui/button';
import { CloseIconThin } from '../../shared/ui/icons/close-icon-thin';
import { SmartHeader } from '../../shared/ui/smart-header';
import { LockIcon } from '../../shared/ui/icons/lock-icon';
import { useMediaQuery } from '../../shared/hooks';
import usePermission from '../../shared/hooks/use-permission';
import { UserRole } from 'shared/types/common.types';

export function PolicyPage() {
  const isMainAdmin = usePermission([], UserRole.ADMIN);
  const isMobile = useMediaQuery('(max-width:900px)');
  // TODO Нужно реализовать хранение значений titleMarkdown и descriptionMarkdown на сервере в базе данных
  const [titleMarkdown, setTitleMarkdown] = useState(initTitleMarkdown);
  const [descriptionMarkdown, setDescriptionMarkdown] = useState(
    initDescriptionMarkdown
  );
  const [titleInput, setTitleInput] = useState(initTitleMarkdown);
  const [descriptionInput, setDescriptionInput] = useState(
    initDescriptionMarkdown
  );
  const [editState, setEditState] = useState(false);
  const handleEditButton = () => {
    setEditState(true);
  };
  const handleCloseButton = () => {
    setEditState(false);
  };
  const onChangeTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };
  const onChangeDescriptionInput = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionInput(event.target.value);
  };
  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setTitleMarkdown(titleInput);
    setDescriptionMarkdown(descriptionInput);
    setEditState(false);
  };
  return (
    <div className={styles.wrapper}>
      <SmartHeader
        icon={<LockIcon color="blue" size="32" />}
        text="Политика конфиденциальности"
        extClassName={isMobile ? styles.smartHeaderOn : styles.smartHeaderOff}
      />
      <div className={styles.overlay} />
      {!editState && (
        <>
          <div className={styles.title}>
            <ReactMarkdown
              className={styles.markdownStyles}
              remarkPlugins={[remarkGfm]}
            >
              {titleMarkdown}
            </ReactMarkdown>
            {isMainAdmin && (
              <button className={styles.editButton} onClick={handleEditButton}>
                <EditIcon color={'blue'} size={'20'} height="18" />
                <p className={styles.editButtonText}>Редактировать</p>
              </button>
            )}
          </div>
          <ReactMarkdown
            className={styles.markdownStyles}
            remarkPlugins={[remarkGfm]}
          >
            {descriptionMarkdown}
          </ReactMarkdown>
        </>
      )}
      {editState && (
        <form className={styles.editForm} onSubmit={onSubmit}>
          <p className={styles.editTitleText}>Заголовок</p>
          <input
            type={'text'}
            name={'title'}
            value={titleInput}
            className={styles.titleInput}
            onChange={onChangeTitleInput}
          />
          <p className={styles.editDescriptionText}>Текст</p>
          <textarea
            className={styles.descriptionInput}
            name={'description'}
            value={descriptionInput}
            onChange={onChangeDescriptionInput}
          ></textarea>
          <div className={styles.buttonContainer}>
            <Button
              buttonType="primary"
              actionType="submit"
              label="Опубликовать"
              size="extraLarge"
            />
            <button className={styles.closeButton} onClick={handleCloseButton}>
              <CloseIconThin color={'blue'}></CloseIconThin>
              <p className={styles.closeButtonText}>Закрыть без изменений</p>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
