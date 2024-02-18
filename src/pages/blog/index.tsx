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
import { useRef, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

const postsPerPage = 10;

export function BlogPage() {
  const user = useAppSelector((store) => store.user.data);

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

  const isAdmin = user?.role === 'admin' || user?.role === 'master';

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

    const formData = new FormData();

    if (!idEditedPost) {
      formData.append(
        'content',
        JSON.stringify({
          title: values.title,
          text: values.text,
          author: {
            id: user.id,
            name: user.fullname,
            avatar: user.avatar,
          },
        })
      );

      for (const attachment of attachments) {
        formData.append('attachments', attachment.file);
      }

      await addPost(formData);

      setValues({ title: '', text: '' });
    } else {
      await editPost({ ...values, id: idEditedPost });
      setValues({ title: '', text: '' });

      const index = posts?.findIndex((post) => post.id === idEditedPost);
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
      title: post.title,
      text: post.text,
      files: post.files,
    });

    setIdEditedPost(post.id);

    refPostForm.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles['blog-page']}>
      <SmartHeader
        icon={<Icon color="blue" icon="PopularIcon" size="46" />}
        text="Блог"
      />

      {isAdmin && (
        <PostForm
          loading={isLoadingNewPost || isLoadingEditedPost}
          refPostForm={refPostForm}
          title={values.title}
          description={values.text}
          addAttachment={handleAddAttachment}
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
          {posts?.map(({ id, title, text, files, author }) => (
            <Post
              id={id}
              key={id}
              title={title}
              text={text}
              files={files}
              author={author}
              handleDeleteButton={isAdmin ? handleDeletePost : undefined}
              handleEditButton={isAdmin ? handleEditPost : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
