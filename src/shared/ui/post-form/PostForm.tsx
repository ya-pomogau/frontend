import { ChangeEvent, Ref, useEffect, type FC } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import { Button } from '../button';
import { TextArea } from '../text-area';
import { Icon } from 'shared/ui';
import { fileTypes } from 'shared/types/common.types';
import { FormInput } from '../form-input';
import useFormField from 'shared/hooks/use-form-field';
import { useAddPostMutation, useEditPostMutation } from 'services/posts-api';
import { IBlogForm } from 'shared/types/blog.types';
import styles from './styles.module.css';

const TITLE_VALIDATION_RULES = {
  required: 'Обязательное поле',
  minLength: {
    value: 4,
    message: 'Имя должно быть больше 4 символов',
  },
};

const TEXT_VALIDATION_RULES = {
  required: 'Обязательное поле',
  minLength: {
    value: 100,
    message: 'Имя должно быть больше 100 символов',
  },
};

interface PostFormProps {
  loading?: boolean;
  refPostForm?: Ref<HTMLFormElement>;
  title?: string;
  text?: string;
  images?: {
    id: string;
    name: string;
  }[];
  addAttachment: (fileList: FileList | null) => void;
  removeAttachment: (id: string) => void;
  handleChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
  idEditedPost: string | undefined;
}

export const PostForm: FC<PostFormProps> = ({
  addAttachment,
  removeAttachment,
  refPostForm,
  images,
  title,
  text,
  handleSubmit,
  idEditedPost,
}) => {
  const [addPost] = useAddPostMutation();
  const [editPost] = useEditPostMutation();
  const {
    control,
    handleSubmit: onSubmit,
    formState: { isValid },
    reset,
  } = useForm<IBlogForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      text: '',
    },
  });

  useEffect(() => {
    if (title !== undefined && text !== undefined) {
      reset({ title, text });
    }
  }, [title, text, reset]);

  const titleField = useFormField('title', control, TITLE_VALIDATION_RULES);
  const textField = useFormField('text', control, TEXT_VALIDATION_RULES);

  const handleSubmitForm = (data: IBlogForm) => {
    idEditedPost
      ? editPost({
          title: data.title,
          text: data.text,
          _id: idEditedPost,
        })
      : addPost({ title: data.title, text: data.text });
    handleSubmit();
    reset();
  };

  const imageTitleStyle = classNames(
    styles['image-title'],
    'text',
    'text_size_small',
    'text_type_regular'
  );

  return (
    <form
      className={styles.form}
      ref={refPostForm}
      onSubmit={onSubmit(handleSubmitForm)}
    >
      <FormInput
        extClassName={styles.input}
        control={control}
        value={titleField.value}
        rules={TITLE_VALIDATION_RULES}
        name="title"
        onChange={titleField.onChange}
        label="Заголовок"
        placeholder="Благотворительность в рекламе"
      />
      <div className={styles['text-block']}>
        <TextArea
          rows={10}
          extClassName={styles.textarea}
          name="text"
          label="Текст блога"
          placeholder="Напишите, чем хотите поделиться?"
          onChange={textField.onChange}
          value={textField.value}
          error={textField.error}
        />
        <label className={styles['attachment-button']}>
          <Icon icon="FileAttachmentIcon" size="24" color="white" />
          <input
            className={styles['input-file']}
            type="file"
            name="fileAttachment"
            accept={[fileTypes.JPEG, fileTypes.JPG, fileTypes.PNG].join(',')}
            multiple
            onChange={(e) => {
              addAttachment(e.target.files);
              e.target.value = '';
            }}
          />
        </label>
      </div>
      <div className={styles.images}>
        {images &&
          images.map(({ id, name }) => (
            <div className={styles.image} key={id}>
              <Icon icon="FileAttachmentIcon" size="14" color="white" />
              <p className={imageTitleStyle}>{name}</p>
              <Button
                buttonType="secondary"
                customIcon={<Icon icon="CloseCrossIcon" size="14" color="blue" />}
                extClassName={styles['close-cross-button']}
                onClick={() => removeAttachment(id)}
                type="button"
              />
            </div>
          ))}
      </div>

      <Button
        type="submit"
        label="Опубликовать"
        buttonType="primary"
        disabled={!isValid}
      />
    </form>
  );
};
