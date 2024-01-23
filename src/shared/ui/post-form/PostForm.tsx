import { ChangeEvent, Ref, type FC } from 'react';
import classNames from 'classnames';
import { Button } from '../button';
import { Input } from '../input';
import { TextArea } from '../text-area';
import { FileAttachmentIcon } from '../icons/file-attachment-icon';
import { CloseCrossIcon } from '../icons/close-cross-icon';
import styles from './styles.module.css';
import { FileTypes } from 'shared/types/common.types';

interface PostFormProps {
  loading?: boolean;
  refPostForm?: Ref<HTMLFormElement>;
  title?: string;
  description?: string;
  images?: {
    id: string;
    name: string;
  }[];
  addAttachment: (fileList: FileList | null) => void;
  removeAttachment: (id: string) => void;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
}

export const PostForm: FC<PostFormProps> = ({
  title,
  description,
  images,
  addAttachment,
  removeAttachment,
  handleChange,
  handleSubmit,
  refPostForm,
  loading,
}) => {
  const imageTitleStyle = classNames(
    styles['image-title'],
    'text',
    'text_size_small',
    'text_type_regular'
  );

  return (
    <form className={styles.form} ref={refPostForm}>
      <Input
        extClassName={styles.input}
        type="text"
        name="title"
        onChange={handleChange}
        label="Заголовок"
        placeholder="Благотворительность в рекламе"
        value={title}
      ></Input>
      <div className={styles['text-block']}>
        <TextArea
          rows={10}
          extClassName={styles.textarea}
          name="description"
          label="Текст блога"
          placeholder="Напишите, чем хотите поделиться?"
          onChange={handleChange}
          value={description || ''}
        ></TextArea>
        <label className={styles['attachment-button']}>
          <FileAttachmentIcon size="24" color="white" />
          <input
            className={styles['input-file']}
            type="file"
            name="fileAttachment"
            accept={[FileTypes.JPEG, FileTypes.JPG, FileTypes.PNG].join(',')}
            multiple
            onChange={(e) => {
              addAttachment(e.target.files);
              e.target.value = '';
            }}
          ></input>
        </label>
      </div>
      <div className={styles.images}>
        {images &&
          images.map(({ id, name }) => (
            <div className={styles.image} key={id}>
              <FileAttachmentIcon size="14" color="white" />
              <p className={imageTitleStyle}>{name}</p>
              <Button
                buttonType="secondary"
                customIcon={<CloseCrossIcon size="14" color="blue" />}
                extClassName={styles['close-cross-button']}
                onClick={() => removeAttachment(id)}
                type="button"
              />
            </div>
          ))}
      </div>

      <Button
        onClick={handleSubmit}
        label="Опубликовать"
        buttonType="primary"
        type="button"
        isLoading={loading}
        disabled={!title?.trim() || !description?.trim()}
      />
    </form>
  );
};
