import { useRef, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

import {
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostsQuery,
} from 'services/posts-api';
import { Icon } from 'shared/ui/icons';
import { Post } from 'shared/ui/post';
import { PostForm } from 'shared/ui/post-form';
import { SmartHeader } from 'shared/ui/smart-header';
import styles from './styles.module.css';
import useForm from 'shared/hooks/use-form';
import { useAppSelector } from 'app/hooks';
import { Loader } from 'shared/ui/loader';
import { PostProps } from 'shared/ui/post/Post';
import { useMediaQuery } from 'shared/hooks';

const postsPerPage = 10;

export function BlogPage() {
  const user = useAppSelector((store) => store.user.data);
  const mediaQuery = useMediaQuery('(max-width: 415px)');
  const [fileInput, setFileInput] = useState<string[]>(['']);

  const { data: posts, isLoading } = useGetPostsQuery(postsPerPage);
  const [addPost, { isLoading: isLoadingNewPost }] = useAddPostMutation();
  const [attachments, setAttachments] = useState<
    { file: File; id: string; name: string }[]
  >([]);
  const [editPost, { isLoading: isLoadingEditedPost }] = useEditPostMutation();
  const [idEditedPost, setIdEditedPost] = useState<string | undefined>(
    undefined
  );
  const [deletePost] = useDeletePostMutation();

  const { values, handleChange, setValues } = useForm({
    title: '',
    text: '',
  });

  const refPostList = useRef<HTMLDivElement>(null);
  const refPostForm = useRef<HTMLFormElement>(null);

  const isAdmin = user?.role === 'Admin';

  const handleAddAttachment = (fileList: FileList | null) => {
    if (!fileList) return;

    const additionalImages = Array.from(fileList).map((file) => ({
      file: file,
      id: `${nanoid()}`,
      name: file.name,
    }));

    setAttachments((prev) => [...prev, ...additionalImages]);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id));
  };

  const handlePublishPost = async () => {
    if (!(values.title.trim() && values.text.trim() && user)) return;
    const img = attachments.map((item) => item.name);

    if (!idEditedPost) {
      await addPost({
        title: values.title,
        text: values.text,
        files: fileInput,
      });

      setValues({ title: '', text: '' });
    } else {
      await editPost({ ...values, _id: idEditedPost });
      setValues({ title: '', text: '' });

      const index = posts?.findIndex((post) => post._id === idEditedPost);
      if (index !== undefined && index > -1) {
        /* атрибут disabled у кнопки отправляющей форму блокирует scrollIntoView,
        подробное описание https://github.com/facebook/react/issues/20770 */
        setTimeout(() => {
          refPostList.current?.children[index]?.scrollIntoView({
            behavior: 'smooth',
          });
        }, 500);
      }

      setIdEditedPost(undefined);
    }
  };

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
  };

  const handleEditPost = (post: Partial<PostProps>) => {
    setValues({
      title: post.title as string,
      text: post.text as string,
    });

    setIdEditedPost(post._id);

    refPostForm.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  console.log(fileInput);

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
        reject(error);
      };
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0];
      const base64 = await getBase64(file);
      setFileInput((state) => [...state, base64]);
    }
  };

  return (
    <div className={styles['blog-page']}>
      {mediaQuery ? (
        <div className={styles.background}>
          <SmartHeader
            extClassName={styles.smartHeader}
            icon={<Icon color="blue" icon="PopularIcon" size="46" />}
            text="Блог"
          />
        </div>
      ) : (
        <SmartHeader
          icon={<Icon color="blue" icon="PopularIcon" size="46" />}
          text="Блог"
        />
      )}

      {isAdmin && (
        <PostForm
          loading={isLoadingNewPost || isLoadingEditedPost}
          refPostForm={refPostForm}
          title={values.title}
          text={values.text}
          addAttachment={handleFile}
          removeAttachment={handleRemoveAttachment}
          handleChange={handleChange}
          handleSubmit={handlePublishPost}
          images={attachments}
        />
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.posts} ref={refPostList}>
          {posts?.map(({ _id, title, text, files, author }) => (
            <Post
              _id={_id}
              key={_id}
              title={title}
              text={text}
              files={files}
              author={author}
              // TODO когда будет работать авторизация, добавить проверку для отображения кнопок только для главного админа и автора поста
              handleDeleteButton={isAdmin ? handleDeletePost : undefined}
              handleEditButton={isAdmin ? handleEditPost : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
