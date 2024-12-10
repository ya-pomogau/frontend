import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import useFormField from 'shared/hooks/use-form-field';
import { useAddPostMutation, useEditPostMutation } from 'services/posts-api';
import { IBlogForm } from 'shared/types/blog.types';
import { fileTypes } from 'shared/types/common.types';

import { Button } from '../button';
import { TextArea } from '../text-area';
import { FormInput } from '../form-input';
import { PostProps } from '../post/Post';
import { Icon, Typography } from 'shared/ui';

import styles from './styles.module.css';

const TITLE_VALIDATION_RULES = {
  required: 'Обязательное поле',
  minLength: {
    value: 4,
    message: 'Минимальная длина должна быть более 4 символов',
  },
};

const TEXT_VALIDATION_RULES = {
  required: 'Обязательное поле',
  minLength: {
    value: 10,
    message: 'Минимальная длина должна быть более 10 символов',
  },
};

interface PostFormProps {
  loading?: boolean;
  addAttachment: (fileList: FileList | null) => void;
  removeAttachment: (id: string) => void;
  selectedPost?: Omit<PostProps, 'handleEditButton' | 'handleDeleteButton'>;
}

export const PostForm = ({
  selectedPost,
  addAttachment,
  removeAttachment,
}: PostFormProps) => {
  const [addPost] = useAddPostMutation();
  const [editPost] = useEditPostMutation();
  const refPostForm = useRef<HTMLFormElement>(null);
  const {
    control,
    handleSubmit: onSubmit,
    formState: { isValid },
    reset,
  } = useForm<IBlogForm>({
    mode: 'onChange',
    values: {
      title: selectedPost?.title,
      text: selectedPost?.text,
      id: selectedPost?._id,
    },
    defaultValues: {
      title: '',
      text: '',
    },
  });

  const titleField = useFormField('title', control, TITLE_VALIDATION_RULES);
  const textField = useFormField('text', control, TEXT_VALIDATION_RULES);

  const hasSelectedPost = selectedPost?._id;

  const handleSubmitForm = (data: IBlogForm) => {
    if (hasSelectedPost) {
      editPost({
        title: data.title,
        text: data.text,
        _id: data.id as string,
      });
    } else {
      addPost({ title: data.title, text: data.text });
    }
    reset();
  };

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
        {selectedPost?.files &&
          selectedPost?.files.map(({ id, alt }) => (
            <div className={styles.image} key={id}>
              <Icon icon="FileAttachmentIcon" size="14" color="white" />
              <Typography color={'primary'} variant={'support'} content={alt} />
              <Button
                buttonType="secondary"
                customIcon={
                  <Icon icon="CloseCrossIcon" size="14" color="blue" />
                }
                extClassName={styles['close-cross-button']}
                onClick={() => removeAttachment(id)}
                type="button"
              />
            </div>
          ))}
      </div>

      <Button
        extClassName={styles.button}
        type="submit"
        label="Опубликовать"
        buttonType="primary"
        disabled={!isValid}
      />
    </form>
  );
};
